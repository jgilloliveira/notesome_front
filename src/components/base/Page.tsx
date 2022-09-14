import React from 'react'
import '../../css/styles.css'

type PageProps = {
  children: JSX.Element[] | JSX.Element,
  className?: string
}

export function Page({ children, className }: PageProps) {

  return (
    <div className={`full-screen scroll ${className}`}>
      {children}
    </div>
  )
}
