import { Note, SerializedNote } from '../types/note.type'
import { connection } from './axios.config'

export async function getNotes(parentFolder?: number | string): Promise<{ data?: Note[], error?: any }> {

  const url = (parentFolder? `notes/?folder=${parentFolder}`:"notes/?folder__isnull=True") + "&is_deleted=False"

  try {
    const { data } = await connection.get<Note[]>(url)
    
    return { data }

  } catch (error: any) {  
    return {error}
  } 
}

export async function getFavoriteNotes(): Promise<{ data?: Note[], error?: any }> {

  const url =  "notes/?is_favorite=True&is_deleted=False"

  try {
    const { data } = await connection.get<Note[]>(url)
    
    return { data }

  } catch (error: any) {  
    return {error}
  } 
}

export async function getDeletedNotes(): Promise<{ data?: Note[], error?: any }> {

  const url =  "notes/?is_deleted=True"

  try {
    const { data } = await connection.get<Note[]>(url)
    
    return { data }

  } catch (error: any) {  
    return {error}
  } 
}

export async function patchNote( noteId: number|string, note: Partial<Note>) {
  
  const url = `notes/${noteId}/`

  const categories = note.categories?.map(category => category.id)

  const serializedNotes = {...note, newCategories: categories}

  
  try {
    const { data } = await connection.patch<Note>(url, serializedNotes)
    return { data }
  } catch (error: any) {
    return {error}
  }
}

export async function postNote(note: Partial<Note>) {
  
  const url = `notes/`

  const categories = note.categories?.map(category => category.id)

  const serializedNotes: Partial<SerializedNote> = {...note, categories}

  try {
    const { data } = await connection.post<Note>(url, serializedNotes)
    return { data }
  } catch (error: any) {
    return {error}
  }
}

export async function deleteNote(noteId: number | string) {
  
  const url = `notes/${noteId}`
  try {
    const { data } = await connection.delete<Note>(url)
    return { data }
  } catch (error: any) {
    return {error}
  }
}

export async function getNotesByCategory(categoryId: number|string): Promise<{ data?: Note[], error?: any }> {

  const url =  `notes/?categories=${categoryId}`

  try {
    const { data } = await connection.get<Note[]>(url)
    
    return { data }

  } catch (error: any) {  
    return {error}
  } 
}