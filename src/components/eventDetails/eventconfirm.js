import React from 'react'
import Button from '../../shared/button'

const EventConfirm = ({title, label, onClick}) => {
  return (
    <article className='level-right'>
      <div className='has-text-centered'>
        <div className='is-size-5 has-text-info'>{title}</div>
        <Button label={label} onClick={onClick} className='button is-primary' />
      </div>
    </article>
  )
}

export default EventConfirm
