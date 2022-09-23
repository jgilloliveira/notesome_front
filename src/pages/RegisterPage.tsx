import React, { useState } from 'react'
import { Page, Button, Input } from '../components/base'
import { loginConnection, registerConnection } from '../connections/session.connection'
import { ErrorResponse, LoginModel, RegisterModel } from '../connections/types.connections'
import { useNavigate } from 'react-router-dom'

export function RegisterPage() {
  
  const [register, setRegister] = useState<RegisterModel>({
    username: "", 
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "",
    confirmPass: ""
  })
  const [error, setError] = useState<ErrorResponse<RegisterModel>>({})
  const navigate = useNavigate()

  async function handleRegister() {
    const { data, error } = await registerConnection(register)
    
    if (error)
      setError(error)

    console.log("Data:", data)
    console.log("Error:", error)
  }

  function handleOnChange(value: string, name: keyof RegisterModel) {

    setRegister({
      ...register,
      [name]: value
    })

  }

  return (
    <Page className='bg-primary flex-center flex'>
      <div className='bg-white rounded-border-sm column pa-lg gap-lg'>
        <h4>Register your new account</h4>
        <Input value={register.username} label="Nombre de usuario" error={error.username} onChange={(value) => handleOnChange(value, "username")}/>
        <Input value={register.firstName} label="Nombre" error={error.firstName} onChange={(value) => handleOnChange(value, "firstName")}/>
        <Input value={register.lastName} label="Apellido" error={error.lastName} onChange={(value) => handleOnChange(value, "lastName")}/>
        <Input value={register.email} label="Email" error={error.email} onChange={(value) => handleOnChange(value, "email")} type='email' />
        <Input value={register.password} label="Contraseña" error={error.password} onChange={(value) => handleOnChange(value, "password")} type='password'/>
        <Input value={register.confirmPass} label="Confermar contraseña" error={error.confirmPass} onChange={(value) => handleOnChange(value, "confirmPass")} type='password'/>
        <div className='text-red mt-xs text-caption'>{error.error}</div>
        <Button onClick={handleRegister}>Register</Button>
        <Button flat={true} onClick={() => navigate('/session/login')}>Login</Button>
      </div>
    </Page>
  )
}