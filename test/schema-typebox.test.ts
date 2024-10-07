import { Value } from "@sinclair/typebox/value";
import { expect, test } from "bun:test";

import {
  FileTreeItemType,
  FileTreeType,
  LinkType,
  PageType,
} from "../src/schema-typebox";

test("parses minimal input schema", () => {
  const pageInput = {
    path: "src/page-one.md",
    type: "page",
    name: "My First Page!!",
  };
  const result = Value.Check(FileTreeItemType, pageInput);
  expect(result).toEqual(true);
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
  const result = Value.Check(FileTreeType, nestedInput);
  expect(result).toEqual(true);
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

  const result = Value.Check(FileTreeItemType, nestedInput);
  console.log([...Value.Errors(FileTreeItemType, nestedInput)]);
  expect(result).toEqual(false);
});

test("page missing properties FileTreeType", () => {
  const invalidItem = {
    type: "page",
    // path: string
  };
  const resultInvalid = Value.Check(FileTreeType, invalidItem);
  expect(resultInvalid).toEqual(false);
});

test("page missing properties FileTreeItemType", () => {
  const invalidItem = {
    type: "page",
    // path: string
  };
  const resultInvalid = Value.Check(FileTreeItemType, invalidItem);
  expect(resultInvalid).toEqual(false);
});

test("throws errors for missing type property", () => {
  const invalidItem = {
    url: "example.com",
  };
  const resultInvalid = Value.Check(FileTreeItemType, invalidItem);
  expect(resultInvalid).toEqual(false);
});

test("throws errors in nested children schemas with wrong properties", () => {
  const invalidItem = {
    type: "page",
  };

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
  const result = Value.Check(FileTreeItemType, nestedInput);
  console.log([...Value.Errors(FileTreeItemType, nestedInput)]);
  expect(result).toEqual(false);
});

test("Invalid Link Item", () => {
  const invalidLink = {
    url: 21, // wrong type
    type: "link",
  };
  const linkRes = Value.Check(LinkType, invalidLink);
  console.log([...Value.Errors(LinkType, invalidLink)]);
  expect(linkRes).toEqual(false);
});

test("Invalid Page", () => {
  const invalidPage = {
    type: "page",
    // path: "some/path",
  };

  const pageRes = Value.Check(PageType, invalidPage);
  console.log([...Value.Errors(PageType, invalidPage)]);
  expect(pageRes).toEqual(false);
});

test("throws error for items with missing required properties", () => {
  const invalidPage = {
    // type: "page"
    path: "some/path",
    children: [
      {
        type: "link",
      },
    ],
  };

  const pageRes = Value.Check(PageType, invalidPage);
  expect(pageRes).toEqual(false);

  const invalidLink = {
    url: 21, // wrong type
    type: "link",
  };
  const linkRes = Value.Check(LinkType, invalidLink);
  expect(linkRes).toEqual(false);

  const schema = {
    path: "src/page-test.md",
    type: "page",
    children: [
      {
        type: "page",
        name: "Page as extra property",
        invalid: 9,
        children: [
          invalidPage,
          {
            name: "Folder",
            type: "folder",
            children: [invalidLink],
          },
        ],
      },
    ],
  };

  const result = Value.Check(FileTreeItemType, schema);
  console.log([...Value.Errors(FileTreeItemType, schema)]);
  expect(result).toEqual(false);
});
