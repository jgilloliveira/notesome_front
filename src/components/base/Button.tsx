import React from 'react';
import '../../css/styles.css'

type ButtonParams = {
  children?: JSX.Element[] | string
}
export function Button({children}: ButtonParams) {
  return (
    <button className='pa-md rounded-border-md no-border text-white bg-primary'>
      {children}
    </button>
  )
}