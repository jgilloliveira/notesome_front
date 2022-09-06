import React, { useState } from 'react'
import { Page, Button, Input } from '../components/base'

export function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Page>
      <Input value={username} onChange={setUsername}/>
      <Input value={password} onChange={setPassword} type='password'/>
      <Button>
        Login
      </Button>
    </Page>
  )
}