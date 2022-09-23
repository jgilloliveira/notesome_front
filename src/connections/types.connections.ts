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

export type RegisterResponse = User

export type LoginResult = {
  data?: LoginResponse,
  error?: ErrorResponse<LoginModel>
}

export type RegisterResult = {
  data?: RegisterResponse,
  error?: ErrorResponse<RegisterModel>
}

export type LoginModel = {
  username: string, 
  password: string
}

export type RegisterModel = {
  username: string, 
  firstName: string, 
  lastName: string, 
  email: string, 
  password: string,
  confirmPass: string
}

// Hace opcionales los atributos de T.
export type ErrorResponse<T> = {
  [Key in keyof T]?: T[Key]
} & {
  error?: string
}