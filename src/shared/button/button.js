import React from 'react'
// import './index.css'
/*
const Button = props => {
  return (
    <button onClick={props.onClick} className='ui-component__button'>
      {props.label}
    </button>
  )
}
*/
const Button = props => {
  const {label, ...attributes} = props
  return (
    <div class='control'>
      <button {...attributes}>{props.label}</button>
    </div>
  )
}
export default Button
