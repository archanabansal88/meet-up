import React from 'react'
const Input = props => {
  const {label, ...attributes} = props
  return (
    <div className='field'>
      <label className='label'>{props.label}</label>
      <div className='control'>
        <input className='input' {...attributes} />
      </div>
    </div>
  )
}
export default Input
