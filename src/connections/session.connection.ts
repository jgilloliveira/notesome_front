import axios from "axios";
import { connection } from "./axios.config";
import { LoginModel, LoginResponse, LoginResult, RegisterModel, RegisterResponse, RegisterResult } from "./types.connections";

function formatErrorResponse(error: any) {

  // Formateo del error que devuelve django.
  for (const attr in error.response.data) {
    const value = error.response.data[attr];
    if(Array.isArray(value))
      error.response.data[attr] = value[0]
  }
  
  return { error: error.response.data }
}

export async function loginConnection(request: LoginModel): Promise<LoginResult> {
  
  try {
    const { data } = await connection.post<LoginResponse>('users/login/', request)
    localStorage.setItem('token', data.token)
    connection.defaults.headers.common['Authorization'] = `Token ${data.token}`
    return { data }

  } catch (error: any) {  
    return formatErrorResponse(error)
  }
}

export async function registerConnection(request: RegisterModel): Promise<RegisterResult> {
  
  try {
    const { data } = await connection.post<RegisterResponse>('users/register/', request)
    return { data }
    
  } catch (error: any) {
    return formatErrorResponse(error)
  }
}

export function logout() {
  connection.defaults.headers.common['Authorization'] = ''
  localStorage.removeItem('token')
}