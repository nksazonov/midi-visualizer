import { NoteOnEvent } from "../lib";

export interface TimeTrackingNoteOn extends NoteOnEvent {
  timeWallTicks: number;
}

export interface MidiNote {
  keyNum: number;
  velocity: number;
  startTime: number;
  duration: number;
}

export interface MidiAnimationFile {
  name: string;
  notes: MidiNote[];
  minNote: number;
  maxNote: number;
}
