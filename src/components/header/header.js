import React from 'react'
import {Link} from 'react-router-dom'
import GoogleOauth from '../googleOauth'
import config from '../../config/index'
import './style.css'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedin: false
    }
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
  }

  handleLoginSuccess (profile) {
    this.setState({isLoggedin: true, profile})

    const data = {
      emailid: profile.getEmail(),
      name: profile.getName(),
      id: profile.getId(),
      image: profile.getImageUrl()
    }

    fetch(`${config.url}api/user/login`, {
      body: JSON.stringify(data),
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('success')
        }
      })
  }

  render () {
    const {isLoggedin, profile} = this.state
    return (
      <div className='header'>
        <div>
          <Link to='/' className='header__link'>
            <h2 className='header__title'>Bangalore <div>JS</div></h2>
          </Link>
        </div>
        {!isLoggedin && <GoogleOauth onLoginSuccess={this.handleLoginSuccess} />}
        {isLoggedin &&
          <div className='header__user-info'>
            <img className='header__user-image' src={profile.getImageUrl()} />{profile.getName()}
          </div>
        }
      </div>
    )
  }
}

export default Header
