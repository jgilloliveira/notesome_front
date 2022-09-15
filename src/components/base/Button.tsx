import React from 'react';
import '../../css/styles.css'

type ButtonParams = {
  children?: JSX.Element[] | string,
  flat?: boolean,
  onClick?: () => void
}
export function Button({children, flat, onClick}: ButtonParams) {
  const styleClasses = flat? "bg-white text-primary": "text-white bg-primary"

  return (
    <button className={`pa-md rounded-border-md no-border pointer opacity-80-hover ${styleClasses}`} onClick={onClick}>
      {children}
    </button>
  )
}