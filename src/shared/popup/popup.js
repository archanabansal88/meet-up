import React from 'react'
import Button from '../button'
import './style.css'

const PopUp = props => {
  return (
    <section className='ui-component__popup'>
      <div className='ui-component__popup-content'>
        <Button label={String.fromCharCode(215)} onClick={props.onClose} />
        <h2 className='ui-component__popup-title'>{props.title}</h2>
        {props.children}
      </div>
    </section>
  )
}

export default PopUp
