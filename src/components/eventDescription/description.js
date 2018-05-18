import React from 'react'
import './style.css'

const Description = (props) => {
  return (
    <section className='event-description'>
      <h2 className='subtitle'>Details</h2>
      <p className='event-description__content'>{props.description}</p>
    </section>
  )
}

export default Description
