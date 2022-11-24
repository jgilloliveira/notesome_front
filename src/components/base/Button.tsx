import React from 'react';
import '../../css/styles.css'
import { ButtonParams } from '../../types';

type ButtonProps = {
  flat?: boolean
} & ButtonParams

export function Button({flat, ...props}: ButtonProps) {
  const styleClasses = flat? "text-primary": "text-white bg-primary"
  return (
    <button {...props} className={`pa-md rounded-border-md no-border pointer opacity-80-hover ${styleClasses} ${props.className}`}>
      {props.children}
    </button>
  )
}