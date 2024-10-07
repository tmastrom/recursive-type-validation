import { Type } from "@sinclair/typebox";
import { DiscriminatedUnionValidator } from "typebox-validators/discriminated";

// WARNING: the typebox-validators library is not maintained

export const LinkSchema = Type.Object({
  type: Type.Literal("link"),
  url: Type.String(),
});

export const PageSchema = Type.Object({
  path: Type.String(),
  type: Type.Literal("page"),
});

export const FolderSchema = Type.Object({
  type: Type.Literal("folder"),
});

const FileTreeSchema = Type.Union([LinkSchema, FolderSchema, PageSchema], {
  discriminantKey: "type",
  errorMessage: "Unknown type",
});

export const validator = new DiscriminatedUnionValidator(FileTreeSchema);
