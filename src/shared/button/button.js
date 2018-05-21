import React from 'react'
const Button = props => {
  const {label, ...attributes} = props
  return (
    <div class='control'>
      <button {...attributes}>{props.label}</button>
    </div>
  )
}
export default Button
