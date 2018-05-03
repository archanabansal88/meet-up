import React from 'react'
import {Link} from 'react-router-dom'
import GoogleOauth from '../googleOauth'
import Logout from '../logout'
import './style.css'

const Header = ({isLoggedin, profile, onLoginSuccess}) => {
  console.log(isLoggedin)
  return (
    <div className='header'>
      <div>
        <Link to='/' className='header__link'>
          <h2 className='header__title'>Bangalore <div>JS</div></h2>
        </Link>
      </div>
      {!isLoggedin && <GoogleOauth onLoginSuccess={onLoginSuccess} />}
      {isLoggedin &&
      <div>
        <div className='header__user-info'>
          <img className='header__user-image' src={profile.getImageUrl()} />{profile.getName()}
        </div>
        <Logout />
      </div>
      }
    </div>
  )
}

export default Header
