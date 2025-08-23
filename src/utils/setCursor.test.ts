import { test } from "node:test";
import { strict as assert } from "node:assert";

// Mock DOM environment
let mockElement = { style: { cursor: "" } };
(global as any).document = {
  getElementById: (id: string) => id === "content" ? mockElement : null
};

// Import after setting up DOM
const { setCursor } = await import("./setCursor.js");

test("setCursor sets cursor style on content element", () => {
  setCursor("pointer");
  assert.equal(mockElement.style.cursor, "pointer");
});

test("setCursor handles different cursor values", () => {
  setCursor("grab");
  assert.equal(mockElement.style.cursor, "grab");
  
  setCursor("default");
  assert.equal(mockElement.style.cursor, "default");
});

test("setCursor returns early when element not found", () => {
  const originalFn = (global as any).document.getElementById;
  (global as any).document.getElementById = () => null;
  
  // Should not throw error
  setCursor("pointer");
  
  // Restore
  (global as any).document.getElementById = originalFn;
});