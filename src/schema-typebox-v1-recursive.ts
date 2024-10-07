import { type Static, Type } from "@sinclair/typebox";

// Circular dependencies are not tolerated here

export const LinkSchema = Type.Recursive(
  (This) =>
    Type.Object({
      type: Type.Literal("link"),
      url: Type.String(),
      children: Type.Optional(
        Type.Array(Type.Union([PageSchema, FolderSchema, This]))
      ),
    }),
  { $id: "Link" }
);

export type Link = Static<typeof LinkSchema>;

export const PageSchema = Type.Recursive(
  (This) =>
    Type.Object({
      path: Type.String(),
      type: Type.Literal("page"),
      children: Type.Optional(
        Type.Array(Type.Union([FolderSchema, LinkSchema, This]))
      ),
    }),
  { $id: "Page" }
);

export type Page = Static<typeof PageSchema>;

export const FolderSchema = Type.Recursive(
  (This) =>
    Type.Object({
      type: Type.Literal("folder"),
      children: Type.Optional(
        Type.Array(Type.Union([PageSchema, LinkSchema, This]))
      ),
    }),
  { $id: "Folder" }
);

export type Folder = Static<typeof FolderSchema>;

export const FileTreeType = Type.Union([PageSchema, LinkSchema, FolderSchema]);
