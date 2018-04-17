import React from 'react'
import GoogleOauth from '../googleOauth'
import './style.css'

const Header = (props) => {
  return (
    <div className='header-container'>
      <h2 className='header-title'>Meet Up</h2>
      <div className='button'><GoogleOauth /></div>
    </div>
  )
}

export default Header
