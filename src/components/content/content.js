import React from 'react'
import GoogleOauth from '../googleOauth'
import EventContainer from '../eventcontainer'
import './style.css'

const Content = () => {
  return (
    <div>
      <div className='content'>
        <GoogleOauth onLoginSuccess={() => {}} />
      </div>
      <EventContainer />
    </div>
  )
}

export default Content
