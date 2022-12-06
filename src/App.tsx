import React, { useState } from "react";
import MidiAnimation from "./components/MidiAnimation";
import { relativeToAbsoluteNotes } from "./conversion/conversion";
import { MidiAnimationObject } from "./conversion/types";
import { read } from "./lib";

function App() {
  const [midiFile, setMidiFile] = useState(undefined as undefined | File);
  const [midiAnimation, setMidiAnimation] = useState(
    undefined as undefined | MidiAnimationObject
  );

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = Array.from(e.target.files!)[0];
    setMidiFile(file);
  };

  const handleVisualizeClick = async (e: React.MouseEvent): Promise<void> => {
    if (!midiFile) {
      return;
    }

    const midi = read(await midiFile.arrayBuffer());

    setMidiAnimation(relativeToAbsoluteNotes(midi));
  };

  return (
    <div className="app">
      <header className="midi-header">
        <span>Midi visualizer</span>
      </header>
      <div className="input-group">
        <input
          className="midi-input"
          type="file"
          onChange={handleFileSelected}
        />
        <button
          className="visualize-midi-button"
          onClick={handleVisualizeClick}
        >
          Visualize
        </button>
      </div>

      {midiAnimation && <MidiAnimation midiAnim={midiAnimation} />}
    </div>
  );
}

export default App;
