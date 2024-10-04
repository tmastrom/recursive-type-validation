import { expect, test } from "bun:test";

import { fileTreeItemSchema } from "../src/schema-zod";

test("parses minimal input schema", () => {
  const pageInput = {
    path: "src/page-one.md",
    type: "page",
    name: "My First Page!!",
  };

  const result = fileTreeItemSchema.safeParse(pageInput);
  expect(result.success).toEqual(true);
});

test.only("page missing properties Union Type", () => {
  const invalidItem = {
    type: "page",
  };
  const resultInvalid = fileTreeItemSchema.safeParse(invalidItem);
  expect(resultInvalid.success).toEqual(false);
});

test("parses nested input", () => {
  const nestedInput = {
    path: "src/page-two.md",
    type: "page",
    name: "Page title in the config!",
    children: [
      {
        name: "First Folder",
        type: "folder",
        children: [
          {
            url: "https://scalar.com/",
            type: "link",
            name: "Nested link",
          },
        ],
      },
    ],
  };

  const result = fileTreeItemSchema.safeParse(nestedInput);
  expect(result.success).toEqual(true);
});

test("throws errors in nested children schemas with missing properties", () => {
  const nestedInput = {
    path: "src/page-two.md",
    type: "page",
    name: "Page title",
    children: [
      {
        name: "First Folder",
        type: "folder",
        children: [
          {
            url: "https://scalar.com/",
            name: "Nested link",
            // type: 'link'  // ERROR: required value
          },
        ],
      },
    ],
  };

  const result = fileTreeItemSchema.safeParse(nestedInput);
  expect(result.success).toEqual(false);
});

test("throws errors in nested children schemas with wrong properties", () => {
  const invalidItem = {
    url: "https://scalar.com/",
    name: "Nested link",
    type: "page",
  };

  const parseInvalid = fileTreeItemSchema.safeParse(invalidItem);
  expect(parseInvalid.success).toBe(false);

  const nestedInput = {
    path: "src/page-two.md",
    type: "page",
    name: "Page title",
    children: [
      {
        name: "First Folder",
        type: "folder",
        children: [invalidItem],
      },
    ],
  };

  const result = fileTreeItemSchema.safeParse(nestedInput);
  expect(result.success).toEqual(false);
});
