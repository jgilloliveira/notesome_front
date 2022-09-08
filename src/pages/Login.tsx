import React, { useState } from 'react'
import { Page, Button, Input } from '../components/base'

export function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Page className='bg-primary'>
      <div className='bg-white rounded-border-sm column pa-lg'>
        <Input value={username} onChange={setUsername}/>
        <Input value={password} onChange={setPassword} type='password'/>
        <Button>
          Login
        </Button>
      </div>
    </Page>
  )
}