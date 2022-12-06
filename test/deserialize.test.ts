import assert from "assert";
import { deserializeSingleEvent } from "../src/lib/deserialize";
import { Stream } from "../src/lib/stream";

describe("deserialize", () => {
  it("deserialize single event", () => {
    const bytes = new Uint8Array([144, 45, 110]);
    const e = deserializeSingleEvent(new Stream(bytes));
    assert.deepStrictEqual(e, {
      type: "channel",
      subtype: "noteOn",
      channel: 0,
      deltaTime: 0,
      noteNumber: 45,
      velocity: 110,
    });
  });
});
