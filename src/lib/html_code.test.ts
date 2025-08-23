import { test } from "node:test";
import { strict as assert } from "node:assert";
import { code } from "./html_code.js";

test("HTML code contains expected structure", () => {
  assert.ok(code.includes("<html>"));
  assert.ok(code.includes("<head>"));
  assert.ok(code.includes("<body>"));
  assert.ok(code.includes("</html>"));
});

test("HTML code includes Monaco Editor script", () => {
  assert.ok(code.includes("monaco-editor"));
  assert.ok(code.includes("vs/loader.js"));
});

test("HTML code structure validation", () => {
  assert.equal(typeof code, "string");
  assert.ok(code.length > 0);
  assert.ok(code.includes("container"));
});