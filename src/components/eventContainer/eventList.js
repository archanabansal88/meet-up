import React from 'react'
import EventCard from '../eventCard'
import {Link} from 'react-router-dom'

const EventList = ({events, onEventClick}) => {
  return (
    <div>
      <div className='is-inline-block'>
        <div className='column is-narrow'>
          <div className='card box is-paddingless is-clipped' style={{'width': '330px', height: '440px'}}>
            <div className='card-header'>
              <p className='card-header-title'> Create New Event</p>
            </div>
            <Link to='/create'>
              <div className='card-content'>
                <div className='has-text-grey-dark subtitle is-5'>createEvent</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {events.map((event, index) => {
        return (
          <div key={index} className='is-inline-block'>
            <EventCard event={event} onEventClick={onEventClick} />
          </div>
        )
      })}
    </div>
  )
}

export default EventList
