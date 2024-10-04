import { z, type ZodSchema } from "zod";

import type { Folder, Link, Page, FileTreeItem } from "./types";

export const pageSchema = z.object({
  path: z.string(),
  type: z.literal("page"),
  children: z.lazy(() => fileTreeItemSchema.array()).optional(),
}) satisfies ZodSchema<Page>;

export const folderSchema = z.object({
  type: z.literal("folder"),
  children: z.lazy(() => fileTreeItemSchema.array()),
}) satisfies ZodSchema<Folder>;

export const linkSchema = z.object({
  type: z.literal("link"),
  url: z.string(),
}) satisfies ZodSchema<Link>;

export const fileTreeItemSchema: ZodSchema<FileTreeItem> = z.union([
  linkSchema,
  pageSchema,
  folderSchema,
]);
