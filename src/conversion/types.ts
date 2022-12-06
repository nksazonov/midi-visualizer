import { NoteOnEvent } from "../lib";

export interface TimeTrackingNoteOn extends NoteOnEvent {
  timeWallTicks: number;
}

export interface GeneralMidiNote {
  velocity: number;
  startTime: number;
  duration: number;
}

export interface MidiNote extends GeneralMidiNote {
  keyNum: number;
}

export interface MidiAnimationObject {
  name: string;
  notes: Map<number, GeneralMidiNote[]>;
  minNote: number;
  maxNote: number;
}

export interface MidiAnimationFile {
  name: string;
  notes: MidiNote[];
  minNote: number;
  maxNote: number;
}
