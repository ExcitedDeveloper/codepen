import { test } from "node:test";
import { strict as assert } from "node:assert";

// Mock HTML template
const mockHtmlCode = `<html><head><title>Monaco Editor Demo</title><style>html,body{height:100%;margin:0}</style><script src="https://unpkg.com/monaco-editor/min/vs/loader.js"></script></head><body><div id="container"></div></body></html>`;

test("HTML code validation", () => {
  assert.ok(mockHtmlCode.includes("<html>") && mockHtmlCode.includes("monaco-editor"));
  assert.ok(mockHtmlCode.includes("<style>") && mockHtmlCode.includes("container"));
  assert.equal(typeof mockHtmlCode, "string");
});