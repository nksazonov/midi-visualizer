import fs from "fs";
import path from "path";
import { read } from "../lib";
import {
  midiAnimationObjectToFile,
  relativeToAbsoluteNotes,
} from "./conversion";

const currDir = process.cwd();

const data = fs.readFileSync(path.join(currDir, "./fixtures/song.mid"));
const midi = read(data);

const animationMidi = relativeToAbsoluteNotes(midi);

fs.writeFileSync(
  path.join(currDir, "./tracks.json"),
  JSON.stringify(midiAnimationObjectToFile(animationMidi))
);
