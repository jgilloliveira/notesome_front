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

export async function getCategoryById(id: number|string): Promise<{ data?: Category, error?: any }> {

  const url = `/categories/${id}/`

  try {
    const { data } = await connection.get<Category>(url)    
    return { data }

  } catch (error: any) {  
    return {error}
  } 
}

export async function patchCategory(id: number|string, category: Partial<Category>): Promise<{ data?: Category, error?: any }> {

  const url = `/categories/${id}/`

  try {
    const { data } = await connection.patch<Category>(url, category)    
    return { data }

  } catch (error: any) {  
    return {error}
  } 
}