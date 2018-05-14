import React, {Component} from 'react'
import config from '../../config/index'

import './style.css'
class Logout extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  signOut () {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.disconnect()
      .then(function () {
        console.log('User signed out.')
      })
  }

  onClick () {
    this.signOut()
    this.props.onLogoutSuccess()
  }

  render () {
    return (
      <div className='logout'>
        <a href={'/logout'} onClick={this.onClick}>logout</a>
      </div>
    )
  }
}

export default Logout
