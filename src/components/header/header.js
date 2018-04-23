import React from 'react'
import GoogleOauth from '../googleOauth'
import './style.css'

const Header = () => {
  return (
    <div className='header-container'>
      <h2 className='header-title'>Meet Up</h2>
      <GoogleOauth onLoginSuccess={() => {}} />
    </div>
  )
}

export default Header
