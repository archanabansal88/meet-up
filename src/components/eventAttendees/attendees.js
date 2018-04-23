import React from 'react'
import './style.css'

const Attendee = ({value, index}) => {
  return (
    <li key={index} className='event-attendees__item'> {value} </li>
  )
}

const Attendees = (props) => {
  return (
    <section className='event-attendees'>
      <h2 className='event-attendees__title'>Attendees</h2>
      <ul className='event-attendees__list'>
        {props.attendees.map((value, index) => <Attendee value={value} index={index} />)}
      </ul>
    </section>
  )
}

export default Attendees
