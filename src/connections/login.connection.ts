import axios from "axios";

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

export async function loginConnection(username: string, password: string) {
  
  const request = {
    username,
    password,
  }

  // TODO: Guardar base host en axios default
  try {
    return await axios.post<LoginResponse>('http://localhost:8000/users/login/', request)
  } catch (error) {
    return { error }
  }
}
