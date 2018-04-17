import React from 'react'
import GoogleOauth from '../googleOauth'
import EventCard from '../eventcontainer/eventcard'
import './style.css'

const Content = () => {
  return (
    <div>
      <div className='content'>
        <GoogleOauth />
      </div>
      <EventCard />
    </div>
  )
}

export default Content
