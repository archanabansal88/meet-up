import React from 'react'
import {Link} from 'react-router-dom'
import GoogleOauth from '../googleOauth'
import Logout from '../logout'

const Header = ({isLoggedin, profile, onLoginSuccess, onLogoutSuccess}) => {
  return (
    <div className='hero'>
      <div className='hero-head card'>
        <div className='card-content level has-background-light'>
          <Link to='/'>
            <h2 className='title'>Bangalore JS</h2>
          </Link>
          {!isLoggedin ? <GoogleOauth onLoginSuccess={onLoginSuccess} />
            : <div className='level-right'>
              <div className='columns level-item'>
                <figure className='image is-48x48'>
                  <img className='is-rounded' src={profile ? profile.getImageUrl() : null} />
                </figure>
                <div className='column'>
                  {profile && profile.getName()}
                </div>
                <Logout onLogoutSuccess={onLogoutSuccess} />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Header
