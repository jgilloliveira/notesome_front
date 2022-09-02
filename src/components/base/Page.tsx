import React from 'react'
import '../../css/styles.css'

type PageProps = { children: JSX.Element }

export function Page({ children }: PageProps) {

  return (
    <div className='full-screen bg-red scroll'>
      {children}
    </div>
  )
}
