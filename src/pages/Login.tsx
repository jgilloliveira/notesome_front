import React, { useState } from 'react'
import { Page, Button, Input } from '../components/base'
import { loginConnection } from '../connections/login.connection'

export function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    const { data, error } = await loginConnection({username, password})
    
    console.log("Data:", data)
    console.log("Error:", error)
  }

  return (
    <Page className='bg-primary flex-center flex'>
      <div className='bg-white rounded-border-sm column pa-lg gap-lg'>
        <h4>Login to your account</h4>
        <Input value={username} placeholder="Nombre de usuario" onChange={setUsername}/>
        <Input value={password} placeholder="Contraseña" onChange={setPassword} type='password'/>
        <Button onClick={handleLogin}>Login</Button>
        <Button flat={true}>Create account</Button>
      </div>
    </Page>
  )
}