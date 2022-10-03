import { connection } from "./axios.config";
import { LoginModel, LoginResponse, LoginResult, RegisterModel, RegisterResponse, RegisterResult } from "./types.connections";
import { formatErrorResponse } from "./utils";

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

export function loadSession() {
  connection.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('token')}`
}

export function logout() {
  connection.defaults.headers.common['Authorization'] = ''
  localStorage.removeItem('token')
}

export function isLogged() {
  return !!connection.defaults.headers.common['Authorization']
}