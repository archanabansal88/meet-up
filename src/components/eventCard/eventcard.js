import React from 'react'
import Title from '../eventTitle/title'
import './style.css'

const EventCard = ({ event }) => {
  const {url, location} = event
  return (
    <div className='event-card'>
      <div>
        <img src={url} className='event-card__image' />
      </div>
      <div className='event-card__content'>
        <div>{location}</div>
        <Title {...event} />
      </div>
    </div>
  )
}

export default EventCard
