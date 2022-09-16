import axios from "axios";
import { connection } from "./axios.config";

interface User {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  isActive: boolean
}

type LoginResponse = {
  user: User,
  token: string
}

type LoginResult = {
  data?: LoginResponse,
  error?: ErrorResponse<LoginModel>
}

type LoginModel = {
  username: string, 
  password: string
}

// Hace opcionales los atributos de T.
type ErrorResponse<T> = {
  [Key in keyof T]?: T[Key]
} & {
  error?: string
}

export async function loginConnection(request: LoginModel): Promise<LoginResult> {
  
  try {
    const { data } = await connection.post<LoginResponse>('users/login/', request)
    localStorage.setItem('token', data.token)
    connection.defaults.headers.common['Authorization'] = `Token ${data.token}`
    return { data }
  } catch (error: any) {

    // Formateo del error que devuelve django.
    for (const attr in error.response.data) {
      const value = error.response.data[attr];
      if(Array.isArray(value))
        error.response.data[attr] = value[0]
    }
    
    return { error: error.response.data }
  }
}
