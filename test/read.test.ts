import assert from "assert";
import fs from "fs";
import { read } from "../src/lib/read";

describe("reader", () => {
  const data = fs.readFileSync("./fixtures/tracks.mid");
  it("throws with empty input", () => {
    assert.throws(() => read([]));
  });
  it("reads Buffer", () => {
    const midi = read(data);
    assert.equal(midi.header.formatType, 1);
    assert.equal(midi.header.ticksPerBeat, 480);
    assert.equal(midi.header.trackCount, 18);
    assert.equal(midi.tracks.length, 18);
  });
});
