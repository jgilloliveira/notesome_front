import React from 'react';
import '../../css/styles.css'

type ButtonParams = {
  children?: JSX.Element[] | string,
  flat?: boolean
}
export function Button({children, flat}: ButtonParams) {
  const styleClasses = flat? "bg-white text-primary": "text-white bg-primary"

  return (
    <button className={`pa-md rounded-border-md no-border pointer opacity-80-hover ${styleClasses}`}>
      {children}
    </button>
  )
}