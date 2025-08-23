import { test } from "node:test";
import { strict as assert } from "node:assert";
import { OpenState, toggleOpenState } from "./openState.js";

test("OpenState enum has correct values", () => {
  assert.equal(OpenState.Open, 0);
  assert.equal(OpenState.Closed, 1);
});

test("toggleOpenState switches from Open to Closed", () => {
  const result = toggleOpenState(OpenState.Open);
  assert.equal(result, OpenState.Closed);
});

test("toggleOpenState switches from Closed to Open", () => {
  const result = toggleOpenState(OpenState.Closed);
  assert.equal(result, OpenState.Open);
});

test("toggleOpenState handles edge cases", () => {
  assert.equal(toggleOpenState(0), 1);
  assert.equal(toggleOpenState(1), 0);
});