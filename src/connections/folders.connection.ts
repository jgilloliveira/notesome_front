import { Folder, SerializedFolder } from '../types/folder.type'
import { Note } from '../types/note.type'
import { connection } from './axios.config'
import { formatErrorResponse } from './utils'

export async function getFolders(parentFolder?: number | string): Promise<{ data?: Folder[], error?: any }> {

  const url = parentFolder? `folders/?parent_folder=${parentFolder}`:"folders/?parent_folder__isnull=True"

  try {
    const { data } = await connection.get<Folder[]>(url)    
    return { data }

  } catch (error: any) {  
    return {error}
  } 
}

export async function getFolderById(id: number | string): Promise<{ data?: Folder, error?: any }> {

  const url = `folders/${id}`

  try {
    const { data } = await connection.get<Folder>(url)    
    return { data }

  } catch (error: any) {  
    return {error}
  } 
}

export async function postFolder(folder: Partial<SerializedFolder>): Promise<{ data?: Folder, error?: any }> {

  const url = `folders/`

  try {
    const { data } = await connection.post<Folder>(url, folder)    
    return { data }

  } catch (error: any) {  
    return {error}
  } 
}

export async function patchFolder(id: number | string, folder: Partial<Folder>): Promise<{ data?: Folder, error?: any }> {

  const url = `folders/${id}`

  try {
    const { data } = await connection.patch<Folder>(url, folder)    
    return { data }

  } catch (error: any) {  
    return {error}
  } 
}