import React from 'react'
// import './style.css'
/*
const TextArea = props => {
  const { ...attributes } = props
  return (
    <textarea {...attributes} className='ui-component__textarea' />
  )
}
*/

const TextArea = props => {
  const { label, ...attributes } = props
  return (
    <div class='field'>
      <label class='label'>{props.label}</label>
      <div class='control'>
        <textarea class='textarea' {...attributes} />
      </div>
    </div>
  )
}

export default TextArea
