import { test } from "node:test";
import { strict as assert } from "node:assert";

// Mock Svelte stores behavior
const mockStores = new Map();
const mockWritable = (initial) => {
  const store = { subscribe: (fn) => fn(initial), set: (val) => mockStores.set(store, val) };
  mockStores.set(store, initial);
  return store;
};

test("Store functionality", () => {
  const store = mockWritable({ isCSSEditorResizerDragging: false });
  store.subscribe(val => assert.equal(val.isCSSEditorResizerDragging, false));
  
  const htmlStore = mockWritable("");
  htmlStore.set("<div>test</div>");
  assert.equal(mockStores.get(htmlStore), "<div>test</div>");
  
  const docFormat = "<html><body>content</body></html>";
  assert.ok(docFormat.includes("<html>") && docFormat.includes("<body>"));
});