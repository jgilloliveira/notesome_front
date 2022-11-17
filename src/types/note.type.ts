import { Category } from "./category.type";

export interface Note {
  id: number,
  title: string,
  content: string,
  color: string,
  isFavorite: boolean,
  isDeleted: boolean,
  modifiedDate: string,
  creationDate: string,
  folder: number | string,
  categories: Category[]
}

export interface SerializedNote extends Omit<Note, "categories"> {
  categories: (number | string)[]
}
