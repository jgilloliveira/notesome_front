import React, { useState } from 'react'
import { Page, Button, Input } from '../components/base'
import { loginConnection } from '../connections/login.connection'
import { ErrorResponse, LoginModel } from '../connections/types.connections'

export function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<ErrorResponse<LoginModel>>({})

  async function handleLogin() {
    const { data, error } = await loginConnection({username, password})

    if (error)
      setError(error)

    console.log("Data:", data)
    console.log("Error:", error)
  }

  function handleOnChange(value: string, name: "username" | "password") {

    if (name === 'username') setUsername(value)
    else if (name === 'password') setPassword(value)
    else throw new Error("Error en handle onChange :O")
  }

  return (
    <Page className='bg-primary flex-center flex'>
      <div className='bg-white rounded-border-sm column pa-lg gap-lg'>
        <h4>Login to your account</h4>
        <Input value={username} placeholder="Nombre de usuario" error={error.username} onChange={(value) => handleOnChange(value, "username")}/>
        <Input value={password} placeholder="Contraseña" error={error.password} onChange={setPassword} type='password'/>
        <div>{error.error}</div>
        <Button onClick={handleLogin}>Login</Button>
        <Button flat={true}>Create account</Button>
      </div>
    </Page>
  )
}