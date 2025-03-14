/**
 * A custom implementation of Lodash's cloneDeep function
 * Creates a deep copy of the value, handling objects, arrays, dates, regular expressions, and primitive values
 * @param {*} value - The value to deep clone
 * @returns {*} - A deep copy of the original value
 */
// WeakMap to track visited objects across recursive calls
const visited = new WeakMap();

function cloneDeep(value) {
  // Handle null and undefined
  if (value === null || value === undefined) {
    return value;
  }

  // Handle primitive types (String, Number, Boolean)
  if (typeof value !== "object") {
    return value;
  }

  // Check for circular references
  if (visited.has(value)) {
    return visited.get(value);
  }

  // Handle Date objects
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  // Handle RegExp objects
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }

  // Create empty clone based on the type
  let clone;

  // Handle Array objects
  if (Array.isArray(value)) {
    clone = [];
    // Register the clone before recursively cloning contents to handle circular refs
    visited.set(value, clone);

    for (let i = 0; i < value.length; i++) {
      clone[i] = cloneDeep(value[i]);
    }
    return clone;
  }

  // Handle Map objects
  if (value instanceof Map) {
    clone = new Map();
    visited.set(value, clone);

    value.forEach((val, key) => {
      clone.set(cloneDeep(key), cloneDeep(val));
    });
    return clone;
  }

  // Handle Set objects
  if (value instanceof Set) {
    clone = new Set();
    visited.set(value, clone);

    value.forEach((val) => {
      clone.add(cloneDeep(val));
    });
    return clone;
  }

  // Handle Object types
  clone = Object.create(Object.getPrototypeOf(value));
  visited.set(value, clone);

  // Copy all enumerable properties
  Object.keys(value).forEach((key) => {
    clone[key] = cloneDeep(value[key]);
  });

  return clone;
}

// Example usage
function testCloneDeep() {
  // Test with nested objects and arrays
  const original = {
    a: 1,
    b: {
      c: 2,
      d: [3, 4, { e: 5 }],
    },
    f: new Date(),
    g: /pattern/gi,
    h: new Map([["key", "value"]]),
    i: new Set([1, 2, 3]),
  };

  // Create circular reference
  original.circular = original;

  const cloned = cloneDeep(original);

  console.log("Original:", original);
  console.log("Clone:", cloned);

  // Test that it's a deep clone
  console.log("Are objects the same reference?", original === cloned); // Should be false
  console.log(
    "Are nested objects the same reference?",
    original.b === cloned.b
  ); // Should be false

  // Modify the clone and check the original remains unchanged
  cloned.b.c = 999;
  console.log("Original after modification:", original.b.c); // Should still be 2
  console.log("Clone after modification:", cloned.b.c); // Should be 999
}

// Run the test
testCloneDeep();

// Export for use in other modules
// module.exports = { cloneDeep };
