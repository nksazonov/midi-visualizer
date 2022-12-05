import { AnyEvent, MidiFile } from "../lib";
import { MidiAnimationFile, TimeTrackingNoteOn } from "./types";

const MEDIUM_NOTE_VALUE = 64;
const MICROSECONDS_IN_MILLISECOND = 1_000;

export function relativeToAbsoluteNotes(midi: MidiFile): MidiAnimationFile {
  const ticksPerBeat = midi.header.ticksPerBeat;

  function _checkAndAddEdgeNoteNumber(noteNumber: number) {
    if (noteNumber < midiAnimation.minNote) {
      midiAnimation.minNote = noteNumber;
    }

    if (noteNumber > midiAnimation.maxNote) {
      midiAnimation.maxNote = noteNumber;
    }
  }

  let midiAnimation: MidiAnimationFile = {
    name: "",
    notes: [],
    minNote: MEDIUM_NOTE_VALUE,
    maxNote: MEDIUM_NOTE_VALUE,
  };

  for (let i = 0; i < midi.tracks.length; i++) {
    // default value
    let microsecondsPerBeat = 500_000;

    const track: AnyEvent[] = midi.tracks[i];

    let timeWallTicks = 0;

    let scannedNoteOnEvents: TimeTrackingNoteOn[] = [];

    for (let j = 0; j < track.length; j++) {
      const event: AnyEvent = track[j];

      timeWallTicks += event.deltaTime;

      // if event is not channel type, find setTempo and register it
      if (event.type != "channel") {
        // support Midi files of types 0, 1 and 2
        if (event.type == "meta" && event.subtype == "setTempo") {
          microsecondsPerBeat = event.microsecondsPerBeat;
        } else {
          continue;
        }
      }

      // ignore events with any subtype except noteOn and noteOff
      if (event.subtype != "noteOn" && event.subtype != "noteOff") {
        continue;
      }

      switch (event.subtype) {
        case "noteOn":
          // compare this note number to already processed
          _checkAndAddEdgeNoteNumber(event.noteNumber);

          // save noteOn event to the list
          scannedNoteOnEvents.push({ ...event, timeWallTicks });
          break;

        case "noteOff":
          // find corresponding noteOn event
          const pairedNoteOnEventIdx = scannedNoteOnEvents.findIndex(
            (noteOn) => noteOn.noteNumber === event.noteNumber
          );

          // corresponding noteOn event found
          if (pairedNoteOnEventIdx !== -1) {
            const pairedNoteOnEvent = scannedNoteOnEvents[pairedNoteOnEventIdx];

            const startTimeTicks = pairedNoteOnEvent.timeWallTicks;
            const durationTicks = timeWallTicks - startTimeTicks;

            const millisecondsPerTick =
              microsecondsPerBeat / ticksPerBeat / MICROSECONDS_IN_MILLISECOND;

            midiAnimation.notes.push({
              keyNum: event.noteNumber,
              velocity: pairedNoteOnEvent.velocity,
              startTime: Math.round(startTimeTicks / millisecondsPerTick),
              duration: Math.round(durationTicks / millisecondsPerTick),
            });
          }

          // remove paired noteOn
          scannedNoteOnEvents.splice(pairedNoteOnEventIdx, 1);

          break;

        default:
          break;
      }
    }
  }

  // sort notes by start time ascending
  midiAnimation.notes.sort((a, b) => a.startTime - b.startTime);

  return midiAnimation;
}
