import React from 'react'
import './index.css'

const Button = props => {
  return (
    <button onClick={props.onClick} className='ui-component__button'>
      {props.label}
    </button>
  )
}

export default Button
