import React from 'react'
import GoogleOauth from '../googleOauth'
import config from '../../config/index'
import './style.css'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
  }

  handleLoginSuccess (profile) {
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
    return (
      <div className='header-container'>
        <h2 className='header-title'>Meet Up</h2>
        <GoogleOauth onLoginSuccess={this.handleLoginSuccess} />
      </div>
    )
  }
}

export default Header
