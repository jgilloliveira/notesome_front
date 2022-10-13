import React from 'react';
import '../../css/styles.css'
import { InputParams } from '../../types';

type InputProps = {
  error?: string,
  label?: string,
  flat?: boolean,
  onChange: (value: string) => void
} & Omit<InputParams, "onChange">



export function Input({error, label, flat, onChange, ...props}: InputProps) {

  return (
    <div className='column'>
      { label && <div className='text-primary mb-xs text-caption'>{label}</div> }
      <input 
        {...props}
        onChange={({target})=>{onChange(target.value)}}
        className={`pa-md no-border bg-transparent text-black ${ error? 'bb-red': flat? '': 'bb-primary'} ${props.className}`}
      />
      { error && <div className='text-red mt-xs text-caption'>{error}</div> }
    </div>
  )
}