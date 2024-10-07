import { type Static, Type } from "@sinclair/typebox";

/**
 * This works but see the tests for the pitfalls.
 * For full validation, you need to recursively iterate over the children
 * and check with the correct "type" schema
 */

export const LinkType = Type.Object({
  type: Type.Literal("link"),
  url: Type.String(),
});

export const PageType = Type.Object({
  path: Type.String(),
  type: Type.Literal("page"),
});

export const FolderType = Type.Object({
  type: Type.Literal("folder"),
});

export const FileTreeType = Type.Union([PageType, LinkType, FolderType]);

export const FileTreeItemType = Type.Recursive(
  (This) =>
    Type.Composite([
      FileTreeType,
      Type.Object({
        children: Type.Optional(Type.Array(This)),
      }),
    ]),
  { $id: "FileTreeItemType" }
);

export type Folder = Static<typeof FolderType>;
export type Page = Static<typeof PageType>;
export type Link = Static<typeof LinkType>;
