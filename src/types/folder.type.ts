export interface Folder {
  id: number,
  name: string,
  parentFolder: Folder,
  childFolders: Folder[],
  modifiedDate: string,
  creationDate: string
}


