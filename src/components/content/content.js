import React from 'react'
import {Redirect} from 'react-router-dom'
import EventContainer from '../eventContainer'
import './style.css'

const Content = ({history, first, handleRedirect}) => {
  if (first) {
    console.log('Ever here?')
    handleRedirect()
    return (
      <Redirect to='/profile' />
    )
  }
  return (
    <div>
      <div className='content'>
        <video autoPlay loop className='content__video'>
          <source src='video.mp4' type='video/mp4' />
        </video>
      </div>
      {/* <EventContainer history={history} /> */}
    </div>
  )
}

export default Content
