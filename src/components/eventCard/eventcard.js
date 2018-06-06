import React from 'react'
import Title from '../eventTitle/title'

const EventCard = ({ event, onEventClick }) => {
  const {image, address1} = event

  return (
    <div className='column is-narrow'>
      <div className='card box is-paddingless is-clipped' style={{'width': '330px', 'height': '440px'}} onClick={onEventClick.bind(null, event)}>
        <div className='card-image'>
          <figure className='image is-4by3'>
            {image && <img src={`./${image.filename}`} />}
          </figure>
        </div>
        <div className='card-content'>
          <div className='has-text-grey-dark subtitle is-5'>{address1}</div>
          <Title {...event} />
        </div>
      </div>
    </div>
  )
}

export default EventCard
