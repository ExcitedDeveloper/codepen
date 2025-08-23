import { test } from "node:test";
import { strict as assert } from "node:assert";
import { dragbarWidth } from "./constants.js";

test("dragbarWidth is defined and has correct value", () => {
  assert.equal(dragbarWidth, 18);
  assert.equal(typeof dragbarWidth, "number");
  assert.ok(dragbarWidth > 0);
});