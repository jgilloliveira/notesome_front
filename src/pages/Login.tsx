import React, { useState } from 'react'
import { Page, Button, Input } from '../components/base'

export function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Page className='bg-primary flex-center flex'>
      <div className='bg-white rounded-border-sm column pa-lg gap-lg'>
        <h4>Login to your account</h4>
        <Input value={username} placeholder="Nombre de usuario" onChange={setUsername}/>
        <Input value={password} placeholder="Contraseña" onChange={setPassword} type='password'/>
        <Button>Login</Button>
        <Button flat={true}>Create account</Button>
      </div>
    </Page>
  )
}