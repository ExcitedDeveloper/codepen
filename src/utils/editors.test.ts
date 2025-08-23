import { test } from "node:test";
import { strict as assert } from "node:assert";
import { Editors } from "./editors.js";

test("Editors enum has correct values", () => {
  assert.equal(Editors.HTML, 0);
  assert.equal(Editors.CSS, 1);
  assert.equal(Editors.JS, 2);
});

test("Editors enum type validation", () => {
  const editorTypes = [Editors.HTML, Editors.CSS, Editors.JS];
  editorTypes.forEach(type => {
    assert.equal(typeof type, "number");
  });
  assert.equal(editorTypes.length, 3);
});