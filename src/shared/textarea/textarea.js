import React from 'react'
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
