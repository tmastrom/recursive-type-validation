export type Page = {
  path: string;
  type: "page";
  children?: FileTreeItem[];
};

export type Folder = {
  type: "folder";
  children: FileTreeItem[];
};

export type Link = {
  type: "link";
  url: string;
};

export type FileTreeItem = Page | Folder | Link;
