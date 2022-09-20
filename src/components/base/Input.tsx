import React from 'react';
import '../../css/styles.css'

type InputParams = {
  placeholder?: string,
  type?: "text" | "password" | "number" | "email",
  value: string,
  error?: string,
  onChange: (value: string) => void 
}

export function Input(props: InputParams) {

  // Default values
  const type = props.type || 'text'

  return (
    <div>
      <input 
        type={type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={({target})=>{props.onChange(target.value)}}
        className='pa-md no-border bb-primary'
      />
      <div className='text-red bb-red'>{props.error}</div>
    </div>
  )
}