export interface User {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  isActive: boolean
}

export type LoginResponse = {
user: User,
  token: string
}

export type LoginResult = {
  data?: LoginResponse,
  error?: ErrorResponse<LoginModel>
}

export type LoginModel = {
  username: string, 
  password: string
}

// Hace opcionales los atributos de T.
export type ErrorResponse<T> = {
  [Key in keyof T]?: T[Key]
} & {
  error?: string
}