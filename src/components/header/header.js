import React from 'react'
import {Link} from 'react-router-dom'
import GoogleOauth from '../googleOauth'
import Logout from '../logout'
import './style.css'

const Header = ({isLoggedin, profile, onLoginSuccess, onLogoutSuccess}) => {
  return (
    <div className='hero is-light'>
      <div className='hero-head level'>
        <div>
          <Link to='/'>
            <h2 className='title'>Bangalore JS</h2>
          </Link>
        </div>
        {!isLoggedin ? <GoogleOauth onLoginSuccess={onLoginSuccess} />
          : <div className='level-right'>
            <img className='header__user-image' src={profile ? profile.getImageUrl() : null} />{profile && profile.getName()}
            <Logout onLogoutSuccess={onLogoutSuccess} />
          </div>
        }
      </div>
    </div>
  )
}

export default Header
