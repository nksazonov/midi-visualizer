import { useEffect, useState } from "react";
import { GeneralMidiNote } from "../conversion/types";

interface Props {
  noteAnimations?: GeneralMidiNote[];
}

const HIGHT_NOTE_OFF = 15;
const HIGHT_NOTE_ON = 95;

const MidiNote = ({ noteAnimations }: Props) => {
  const [height, setHeight] = useState(HIGHT_NOTE_OFF);

  useEffect(() => {
    if (noteAnimations) {
      noteAnimations.forEach((note) => {
        setTimeout(() => setHeight(HIGHT_NOTE_ON), note.startTime);
        setTimeout(
          () => setHeight(HIGHT_NOTE_OFF),
          note.startTime + note.duration
        );
      });
    }
  }, [noteAnimations]);

  return (
    <div className="note-visualization" style={{ height: height + "px" }} />
  );
};

export default MidiNote;
