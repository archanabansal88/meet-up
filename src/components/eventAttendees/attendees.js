import React from 'react'

const Attendees = ({attendees}) => {
  return (
    <section className='section'>
      <h2 className='title is-size-4'>Attendees</h2>
      {attendees && attendees.length
        ? <ul className='media'>
          {attendees.map((value, index) => {
            return (
              <li key={index} className='box media-left'>
                <figure className='image is-64x64'>
                  <img className='is-rounded' src={value.image} />
                </figure>
                <div className='is-size-6'>{value.name}</div>
              </li>
            )
          })}
        </ul>
        : <article className='message is-dark has-background-white'>
          <div className='message-body'>No Attendees</div>
        </article>
      }
    </section>
  )
}

export default Attendees
