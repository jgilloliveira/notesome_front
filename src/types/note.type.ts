export interface Note {
  id: number,
  title: string,
  content: string,
  color: string,
  isFavorite: boolean,
  isDelete: boolean,
  modifiedDate: string,
  creationDate: string,
  folder: number | string
}
