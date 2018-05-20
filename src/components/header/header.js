import React from 'react'
import {Link} from 'react-router-dom'
import GoogleOauth from '../googleOauth'
import Logout from '../logout'
import './style.css'

const Header = ({isLoggedin, profile, onLoginSuccess, onLogoutSuccess}) => {
  return (
    <div className='header'>
      <div>
        <Link to='/' className='header__link'>
          <h2 className='title'>Bangalore <div>JS</div></h2>
        </Link>
      </div>
      {!isLoggedin ? <GoogleOauth onLoginSuccess={onLoginSuccess} />
        : <div className='header__user-info'>
          <img className='header__user-image' src={profile ? profile.getImageUrl() : null} />{profile && profile.getName()}
          <Logout onLogoutSuccess={onLogoutSuccess} />
        </div>
      }
    </div>
  )
}

export default Header
