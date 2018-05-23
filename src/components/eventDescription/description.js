import React from 'react'

const Description = (props) => {
  return (
    <section className='section'>
      <h2 className='title is-size-4'>Details</h2>
      <div>
        <p className='subtitle'>{props.description}</p>
      </div>
    </section>
  )
}

export default Description
