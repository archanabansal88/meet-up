import React from 'react'
import './index.css'

const Button = props => {
  return (
    <div className='buttonContainer'>
      <button onClick={props.onClick} className='ui-component-button'>
        {props.label}
      </button>
    </div>
  )
}

export default Button
