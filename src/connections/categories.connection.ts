import { Category } from '../types/category.type'
import { connection } from './axios.config'
import { formatErrorResponse } from './utils'

export async function getCategories(): Promise<{ data?: Category[], error?: any }> {

  const url = "/categories/"

  try {
    const { data } = await connection.get<Category[]>(url)    
    return { data }

  } catch (error: any) {  
    return {error}
  } 
}