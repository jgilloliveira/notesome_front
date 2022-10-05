import { Folder } from '../types/folder.type'
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