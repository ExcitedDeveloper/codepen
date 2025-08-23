import { test } from "node:test";
import { strict as assert } from "node:assert";
import { code } from "./js_code.js";

test("JS code contains expected functions", () => {
  assert.ok(code.includes("getFullName"));
  assert.ok(code.includes("makeAdder"));
});

test("JS code demonstrates closure pattern", () => {
  assert.ok(code.includes("makeAdder(5)"));
  assert.ok(code.includes("makeAdder(10)"));
  assert.ok(code.includes("add5(2)"));
  assert.ok(code.includes("add10(2)"));
});

test("JS code function behavior", () => {
  assert.equal(typeof code, "string");
  assert.ok(code.length > 0);
  assert.ok(code.includes("console.log"));
});