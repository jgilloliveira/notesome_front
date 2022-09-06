import React from 'react';

type ButtonParams = {
  children?: JSX.Element[] | string
}
export function Button({children}: ButtonParams) {
  return (
    <button>
      {children}
    </button>
  )
}