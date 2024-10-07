import { Type } from "@sinclair/typebox";

/**
 * The type schemas we want in an ideal world
 * but Typebox doesn't work like this
 */

export const LinkSchema = Type.Object({
  type: Type.Literal("link"),
  url: Type.String(),
  children: Type.Optional(Type.Array([PageSchema, LinkSchema, FolderSchema])),
});

export const PageSchema = Type.Object({
  path: Type.String(),
  type: Type.Literal("page"),
  children: Type.Optional(Type.Array([PageSchema, LinkSchema, FolderSchema])),
});

export const FolderSchema = Type.Object({
  type: Type.Literal("folder"),
  children: Type.Optional(Type.Array([PageSchema, LinkSchema, FolderSchema])),
});

export const FileTreeSchema = Type.Union([
  PageSchema,
  LinkSchema,
  FolderSchema,
]);
