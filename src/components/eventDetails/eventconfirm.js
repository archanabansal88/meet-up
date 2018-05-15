import React from 'react'
import Button from '../../shared/button'

const EventConfirm = ({title, label, onClick}) => {
  return (
    <article className='event-details__user'>
      <div className='event-details__title'>{title}</div>
      <div className='event-details__button'>
        <Button label={label} onClick={onClick} />
      </div>
    </article>
  )
}

export default EventConfirm
