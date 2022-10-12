import React, { useState } from 'react'
import { Page, Button, Input } from '../components/base'
import { registerConnection } from '../connections/session.connection'
import { ErrorResponse, LoginModel, RegisterModel } from '../connections/types.connections'
import { useNavigate } from 'react-router-dom'
import { SesionLayout } from '../layouts/SessionLayout'

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
  const [loading, setLoading] = useState(false)
  const [registered, setRegistered] = useState(false)

  async function handleRegister() {

    if (loading) return

    setError({})
    setLoading(true)

    await new Promise(r => setTimeout(r, 4000))

    const { data, error } = await registerConnection(register)
    
    if (error) setError(error)
    else setRegistered(true)

    setLoading(false)
  }

  function handleOnChange(value: string, name: keyof RegisterModel) {

    setRegister({
      ...register,
      [name]: value
    })

  }

  return (
    <SesionLayout>
      <Page>
        { 
          registered
          ? <RegisterSuccessful/>
          : <div className='column gap-lg'>
              <h4>Register your new account</h4>
              <Input value={register.username} label="Nombre de usuario" disabled={loading} error={error.username} onChange={(value) => handleOnChange(value, "username")}/>
              <Input value={register.firstName} label="Nombre" disabled={loading} error={error.firstName} onChange={(value) => handleOnChange(value, "firstName")}/>
              <Input value={register.lastName} label="Apellido" disabled={loading} error={error.lastName} onChange={(value) => handleOnChange(value, "lastName")}/>
              <Input value={register.email} label="Email" disabled={loading} error={error.email} onChange={(value) => handleOnChange(value, "email")} type='email' />
              <Input value={register.password} label="Contraseña" disabled={loading} error={error.password} onChange={(value) => handleOnChange(value, "password")} type='password'/>
              <Input value={register.confirmPass} label="Confermar contraseña" disabled={loading} error={error.confirmPass} onChange={(value) => handleOnChange(value, "confirmPass")} type='password'/>
              <div className='text-red mt-xs text-caption'>{error.error}</div>
              <Button onClick={handleRegister}>{ loading? "Registrando": "Register"}</Button>
              {/* TODO: Loader de corazoncito */}
              <Button flat={true} onClick={() => navigate('/session/login')}>Login</Button>
            </div>
        }
      </Page>
    </SesionLayout>
  )
}

function RegisterSuccessful() {

  const navigate = useNavigate()

  return (
    <>
      <div className=''>
        Registro completado!
      </div>
      <Button onClick={() => navigate('/session/login')}>Inicia sesión</Button>
    </>
  )
}