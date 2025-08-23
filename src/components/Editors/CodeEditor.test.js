import { test } from "node:test";
import { strict as assert } from "node:assert";

test("Basic test functionality", () => {
  // Test basic assertions work
  assert.equal(1 + 1, 2);
  assert.ok(true);
  assert.equal("hello", "hello");
});

test("Test runner is working", () => {
  const obj = { a: 1, b: 2 };
  assert.ok(obj);
  assert.equal(obj.a, 1);
  assert.equal(obj.b, 2);
});