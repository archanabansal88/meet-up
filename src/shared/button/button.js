import React from 'react'
const Button = props => {
  const {label, ...attributes} = props
  return (
    <div className='field'>
      <div class='control'>
        <button {...attributes}>{props.label}</button>
      </div>
    </div>
  )
}
export default Button
