import React from 'react'
import Button from '../button'

const PopUp = props => {
  return (
    <div className='modal is-active'>
      <div className='modal-background' />
      <div className='modal-content'>
        <div className='box'>
          <h2 className='subtitle'>{props.title}</h2>
          {props.children}
        </div>
      </div>
      <Button onClick={props.onClose} className='modal-close is-large' aria-label='close' />
    </div>
  )
}

export default PopUp
