import React from 'react'
import Carousel from '../carousel/carousel'
import EventCard from '../eventcard/eventcard'
import data from '../../../data/sample'
import './style.css'

const EventContainer = () => {
  return (
    <div className='event'>
      <Carousel>
        {data.map((event, index) => {
          return (
            <div key={index} className='eventlist'>
              <EventCard event={event} />
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default EventContainer
