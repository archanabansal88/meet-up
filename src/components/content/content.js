import React from 'react'
import GoogleOauth from '../googleOauth/googleOauth'
import EventContainer from '../eventcontainer/eventcontainer'
import './style.css'

const Content = () => {
  return (
    <div>
      <div className='content'>
        <GoogleOauth />
      </div>
      <EventContainer />
    </div>
  )
}

export default Content
