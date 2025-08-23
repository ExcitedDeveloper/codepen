import { test } from "node:test";
import { strict as assert } from "node:assert";

// Mock JS template with demo functions
const mockJsCode = `function getFullName(first,last){return first+" "+last;}function makeAdder(x){return function(y){return x+y;}}const add5=makeAdder(5);console.log(add5(2));`;

test("JS code validation", () => {
  assert.ok(mockJsCode.includes("getFullName") && mockJsCode.includes("makeAdder"));
  assert.ok(mockJsCode.includes("makeAdder(5)") && mockJsCode.includes("console.log"));
  assert.equal(typeof mockJsCode, "string");
});