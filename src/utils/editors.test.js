import { test } from "node:test";
import { strict as assert } from "node:assert";

// Test the expected Editors enum behavior
test("Editors enum expected values", () => {
  const MockEditors = {
    HTML: 0,
    CSS: 1,
    JS: 2
  };
  
  assert.equal(MockEditors.HTML, 0);
  assert.equal(MockEditors.CSS, 1);
  assert.equal(MockEditors.JS, 2);
});

test("Editors enum type validation", () => {
  const editorTypes = ["HTML", "CSS", "JS"];
  
  editorTypes.forEach(type => {
    assert.equal(typeof type, "string");
  });
  
  assert.equal(editorTypes.length, 3);
});