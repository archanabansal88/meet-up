import React, {Component} from 'react'
import id from '../../config/setup.js'

class GoogleOauth extends Component {
  constructor (props) {
    super(props)
    this.onFailure = this.onFailure.bind(this)
    this.handleSigninSuccess = this.handleSigninSuccess.bind(this)
    this.init = this.init.bind(this)
  }

  loadScript () {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/client:platform.js'
    script.onload = this.init
    script.id = 'google-login'
    document.head.appendChild(script)
  }

  componentWillMount () {
    this.loadScript()
  }

  init () {
    const params = {
      client_id: id.clientid.google,
      cookie_policy: 'single_host_origin',
      fetch_basic_profile: true,
      ux_mode: 'popup',
      scope: 'profile email',
      access_type: 'online'
    }

    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init(params).then(
          res => {
            if (res.isSignedIn.get()) {
              return this.handleSigninSuccess(res.currentUser.get())
            }
          },
          err => this.onFailure(err)
        )
      } else {
        const auth = window.gapi.auth2.getAuthInstance()
        auth.isSignedIn.listen((isLoggedIn) => {
          if (isLoggedIn) {
            this.handleSigninSuccess(auth.currentUser.get())
          }
        })
      }
    })
  }

  onFailure (err) {
    console.log(err)
  }

  handleSigninSuccess (googleUser) {
    const profile = googleUser.getBasicProfile()
    this.props.onLoginSuccess(profile)
  }

  render () {
    return (
      <div className='g-signin2' data-onsuccess='onSignIn' onClick={this.init} />
    )
  }
}

export default GoogleOauth
