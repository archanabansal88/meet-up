import React from 'react'

const TextArea = props => {
  const {label, isHorizontal, ...attributes} = props
  const clsName = isHorizontal ? 'field is-horizontal' : 'field'

  return (
    <div className={clsName}>
      <div className='field-label is-normal'>
        <label className='label'>{props.label}</label>
      </div>
      <div className='field-body'>
        <div className='field'>
          <div className='control'>
            <textarea className='textarea' {...attributes} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextArea
