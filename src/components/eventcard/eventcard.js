import React from 'react'
import './style.css'

const EventCard = ({event}) => {
  const {url, dateTime, location, title} = event
  return (
    <div className='event-card'>
      <div>
        <img src={url} className='event-card__image' />
      </div>
      <div className='event-card__content'>
        <div>{dateTime}</div>
        <div>{location}</div>
        <div>{title}</div>
      </div>
    </div>
  )
}

export default EventCard
