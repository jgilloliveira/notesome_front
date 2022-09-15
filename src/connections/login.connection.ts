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
  error?: any
}

export async function loginConnection(username: string, password: string): Promise<LoginResult> {
  
  const request = {
    username,
    password,
  }

  try {
    return await connection.post<LoginResponse>('users/login/', request)
  } catch (error) {
    return { error }
  }
}
