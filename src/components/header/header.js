import React from 'react'
import {Link} from 'react-router-dom'
import GoogleOauth from '../googleOauth'
import Logout from '../logout'

const Header = ({isLoggedin, onLoginSuccess, onLogoutSuccess, profile, handleFirst, first, handleRedirect}) => {
  return (
    <div className='hero'>
      <div className='hero-head card'>
        <div className='card-content level has-background-light'>
          <Link to='/' onClick={() => handleRedirect(window.location.pathname)}>
            <h2 className='title'>Bangalore JS</h2>
          </Link>
          {(!isLoggedin) ? <GoogleOauth onLoginSuccess={onLoginSuccess.bind(this)} />
            : <div className='level-right'>
              <div className='columns level-item'>
                <Link to='/profile' onClick={() => handleRedirect(window.location.pathname)}>
                  <figure className='image is-48x48'>
                    <img className='is-rounded' src={
                      profile
                        ? (profile.display ? profile.image : ('https://ui-avatars.com/api/?name=' + profile.name.replace(' ', '+'))) : null} />
                  </figure>
                </Link>
                <div className='column'>
                  {profile ? profile.name : null}
                </div>
                <Logout onLogoutSuccess={onLogoutSuccess} handleFirst={handleFirst} first={first} />
              </div>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Header
