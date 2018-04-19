import React, {Component} from 'react'

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
      client_id: '689254462441-12m3gtb3llr27d4u4pvf6n0je55h24lf.apps.googleusercontent.com',
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
    console.log('ID: ' + profile.getId())
    console.log('Name: ' + profile.getName())
    console.log('Image URL: ' + profile.getImageUrl())
    console.log('Email: ' + profile.getEmail())
  }

  render () {
    return (
      <div class='g-signin2' data-onsuccess='onSignIn' />
    )
  }
}

export default GoogleOauth
