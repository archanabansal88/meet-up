import React from 'react'
const Input = props => {
  const {label, ...attributes} = props
  return (
    <div className='field is-horizontal'>
      <div className='field-label is-normal'>
        <label className='label'>{props.label}</label>
      </div>
      <div className='field-body'>
        <div className='field'>
          <div className='control'>
            <input className='input' {...attributes} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Input
