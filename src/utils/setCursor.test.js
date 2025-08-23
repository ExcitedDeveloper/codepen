import { test } from "node:test";
import { strict as assert } from "node:assert";

test("setCursor function behavior", () => {
  let elem = { style: { cursor: "" } };
  global.document = { getElementById: () => elem };
  
  const setCursor = (cursor) => {
    const content = document.getElementById("content");
    if (content) content.style.cursor = cursor;
  };
  
  setCursor("pointer");
  assert.equal(elem.style.cursor, "pointer");
});