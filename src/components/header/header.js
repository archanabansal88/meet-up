import React from 'react'
import {Link} from 'react-router-dom'
import GoogleOauth from '../googleOauth'
import Logout from '../logout'
import './style.css'

const Header = ({isLoggedin, onLoginSuccess, onLogoutSuccess, profile}) => {
  console.log(profile)
  return (
    <div className='header'>
      <div>
        <Link to='/' className='header__link'>
          <h2 className='header__title'>Bangalore <div>JS</div></h2>
        </Link>
      </div>
      {(!isLoggedin && !profile.name) ? <GoogleOauth onLoginSuccess={onLoginSuccess.bind(this)} />
        : <div>
          <Link to='/profile' className='profile_link'>
            <div className='header__user-info'>
              <img className='header__user-image' src={
                profile
                  ? (profile.display ? profile.image : ('https://ui-avatars.com/api/?name=' + profile.name.replace(' ', '+'))) : null} />{profile ? profile.name : null}
            </div>
          </Link>
          <Logout onLogoutSuccess={onLogoutSuccess.bind(this)} />
        </div>
      }
    </div>
  )
}

export default Header
