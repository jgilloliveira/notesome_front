import React from 'react';
import '../../css/styles.css'

type InputParams = {
  placeholder?: string,
  type?: "text" | "password" | "number" | "email",
  value: string,
  error?: string,
  label?: string,
  disable?: boolean,
  onChange: (value: string) => void 
}

export function Input(props: InputParams) {

  // Default values
  const type = props.type || 'text'

  return (
    <div className='column'>
      { props.label && <div className='text-primary mb-xs text-caption'>{props.label}</div> }
      <input 
        type={type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={({target})=>{props.onChange(target.value)}}
        className={`pa-md no-border ${ props.error? 'bb-red': 'bb-primary'}`}
        disabled={props.disable}
      />
      { props.error && <div className='text-red mt-xs text-caption'>{props.error}</div> }
    </div>
  )
}