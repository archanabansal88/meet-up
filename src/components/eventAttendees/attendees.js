import React from 'react'
import './style.css'

const Attendee = ({value, index}) => {
  return (
    <li key={index} className='event-attendees__item'>
      <img className='event-attendees__image' src={value.image} />
      <div className='event-attendees__name'>{value.name}</div>
    </li>
  )
}

const Attendees = ({attendees}) => {
  return (
    <section className='event-attendees'>
      <h2 className='event-attendees__title'>Attendees</h2>
      {attendees && attendees.length
        ? <ul className='event-attendees__list'>
          {attendees.map((value, index) => <Attendee value={value} index={index} />)}
        </ul>
        : <div>No attendees</div>
      }
    </section>
  )
}

export default Attendees
