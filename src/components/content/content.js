import React from 'react'
import {Redirect} from 'react-router-dom'
import EventContainer from '../eventContainer'

const Content = ({history, first, handleRedirect, onEventClick}) => {
  if (first) {
    handleRedirect(history.location.pathname)
    return (
      <Redirect to='/profile' />
    )
  }
  return (
    <div>
      <div className='container is-fluid is-clipped is-marginless' style={{'height': '450px'}}>
        <video autoPlay loop className='is-overlay column is-12 is-paddingless' style={{'top': '-120px'}}>
          <source src='video.mp4' type='video/mp4' />
        </video>
      </div>
      <EventContainer onEventClick={onEventClick} showCarousel />
    </div>
  )
}

export default Content
