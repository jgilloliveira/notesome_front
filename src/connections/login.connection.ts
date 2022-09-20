import axios from "axios";
import { connection } from "./axios.config";
import { LoginModel, LoginResponse, LoginResult } from "./types.connections";

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
