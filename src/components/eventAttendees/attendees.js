import React from 'react'

const Attendee = ({value, index}) => {
  return (
    <li key={index} className='box media-left'>
      <img className=' image is-80x80' style={{'border-radius': '50px'}} src={value.image} />
      <div className='is-size-6'>{value.name}</div>
    </li>
  )
}

const Attendees = ({attendees}) => {
  return (
    <section className='section'>
      <h2 className='title is-size-4'>Attendees</h2>
      {attendees && attendees.length
        ? <ul className='media'>
          {attendees.map((value, index) => <Attendee value={value} index={index} />)}
        </ul>
        : <div className='card section has-text-centered'>No Attendees</div>
      }
    </section>
  )
}

export default Attendees
