import { Note } from '../types/note.type'
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

export async function patchNote( noteId: number, note: Partial<Note>) {
  
  const url = `notes/${noteId}/`
  try {
    const { data } = await connection.patch<Note>(url, note)
    return { data }
  } catch (error: any) {
    return {error}
  }
}

export async function postNote(note: Partial<Note>) {
  
  const url = `notes/`
  try {
    const { data } = await connection.post<Note>(url, note)
    return { data }
  } catch (error: any) {
    return {error}
  }
}