import { MidiAnimationObject } from "../conversion/types";
import MidiNote from "./MidiNote";

interface Props {
  midiAnim: MidiAnimationObject;
}

const NOTES_SIDE_EXTENSION_NUM = 3;

const MidiAnimation = ({ midiAnim }: Props) => {
  const minNote = midiAnim.minNote - NOTES_SIDE_EXTENSION_NUM;
  const maxNote = midiAnim.maxNote + NOTES_SIDE_EXTENSION_NUM;

  const midiAnimNotes = [];
  for (let keyNum = minNote; keyNum <= maxNote; keyNum++) {
    midiAnimNotes.push(
      <MidiNote noteAnimations={midiAnim.notes.get(keyNum)} key={keyNum} />
    );
  }

  return (
    <div className="notes-visualization">
      {midiAnimNotes.map((note) => note)}
    </div>
  );
};

export default MidiAnimation;
