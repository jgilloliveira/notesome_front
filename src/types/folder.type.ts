export interface Folder {
  id: number,
  name: string,
  parentFolder: Folder,
  childFolders: Folder[],
  modifiedDate: string,
  creationDate: string
}

export interface SerializedFolder extends Omit<Folder, "parentFolder" | "childFolders"> {
  parentFolder: number | string,
}
