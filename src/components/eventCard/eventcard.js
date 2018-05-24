import React from 'react'
import Title from '../eventTitle/title'

const EventCard = ({ event, onEventClick }) => {
  const {url, address1} = event
  return (
    <div className='column is-narrow'>
      <div className='card box is-paddingless is-clipped' style={{'width': '330px'}} onClick={onEventClick.bind(null, event)}>
        <div class='card-image'>
          <figure class='image is-4by3'>
            <img src={url} />
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
