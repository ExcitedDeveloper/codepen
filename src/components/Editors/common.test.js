import { test } from "node:test";
import { strict as assert } from "node:assert";

// Mock workers and getWorker function
const mockWorkers = {
  json: class {},
  css: class {},
  html: class {},
  ts: class {},
  editor: class {}
};

const getWorker = (_, label) => {
  const workerMap = {
    json: mockWorkers.json,
    css: mockWorkers.css, scss: mockWorkers.css, less: mockWorkers.css,
    html: mockWorkers.html, handlebars: mockWorkers.html, razor: mockWorkers.html,
    typescript: mockWorkers.ts, javascript: mockWorkers.ts
  };
  return new (workerMap[label] || mockWorkers.editor)();
};

test("getWorker returns correct workers for language types", () => {
  assert.ok(getWorker(null, "json") instanceof mockWorkers.json);
  assert.ok(getWorker(null, "css") instanceof mockWorkers.css);
  assert.ok(getWorker(null, "html") instanceof mockWorkers.html);
  assert.ok(getWorker(null, "typescript") instanceof mockWorkers.ts);
  assert.ok(getWorker(null, "unknown") instanceof mockWorkers.editor);
});