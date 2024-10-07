import { expect, test } from "bun:test";

import { validator } from "../src/discriminated-union-validator";

test.only("page missing properties FileTreeType", () => {
  const invalidItem = {
    type: "page",
    // path: string
  };

  // throws exception with message "Invalid value" and the single error
  //  "Unknown type" for path "":
  validator.assert(invalidItem);
});

test("page missing properties FileTreeItemType", () => {
  const invalidItem = {
    type: "page",
    // path: string
  };
});

test("throws errors for missing type property", () => {
  const invalidItem = {
    url: "example.com",
  };
});
