import React from 'react'
import '../../css/styles.css'
import { DivParams } from '../../types'

export function Page( props: DivParams) {

  return (
    <div {...props} className={`scroll ${props.className}`}>
      {props.children}
    </div>
  )
}
