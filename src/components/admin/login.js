import React from 'react'
import GoogleOauth from '../googleOauth'
import config from '../../config/index'
import './style.css'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
  }

  handleLoginSuccess (profile) {
    const data = {
      emailid: profile.getEmail()
    }

    fetch(`${config.url}api/login`, {
      body: JSON.stringify(data),
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.history.push('/create')
        }
      })
  }
  render () {
    return (
      <div>
        <GoogleOauth onLoginSuccess={this.handleLoginSuccess} />
      </div>
    )
  }
}

export default Login
