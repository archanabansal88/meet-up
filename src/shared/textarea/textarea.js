import React from 'react'
import './style.css'

const TextArea = props => {
  const { ...attributes } = props
  return (
    <textarea {...attributes} className='ui-component__textarea' />
  )
}

export default TextArea
