import { expect, test } from "bun:test";

import { validator } from "../src/discriminated-union-validator";

test.only("page missing properties FileTreeType", () => {
  const invalidItem = {
    type: "page",
    // path: string
  };

  // throws exception with message "Invalid value"
  validator.assert(invalidItem);

  // Error is not descriptive
  // ✗ page missing properties FileTreeType
});
