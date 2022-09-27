import React from 'react'
import '../../css/styles.css'
import { DivParams } from '../../types'

export function Layout( props : DivParams) {

  return (
    <div {...props} className={`full-screen no-scroll ${props.className}`}>
      {props.children}
    </div>
  )
}
