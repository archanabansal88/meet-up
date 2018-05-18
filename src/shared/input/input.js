import React from 'react'
// import './index.css'
/*
const Input = props => {
  const { className, label, isValid, errorMsg, ...others } = props
  const validCls = !isValid ? 'ui-component__input--isInvalid' : ''

  return (
    <div className={`ui-component__input ${validCls}`}>
      {label && <label className='ui-component__input--label'>{label}</label>}
      <input {...others} className={`${className} ui-component__input-field`} />
      {!isValid && <div className='ui-component__input--error'>{errorMsg}</div>}
    </div>
  )
}
*/

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
