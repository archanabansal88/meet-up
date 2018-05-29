import React, {Component} from 'react'
import Button from '../../shared/button'

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
    if (this.props.first) {
      this.props.handleFirst()
    }
  }

  render () {
    return (
      <Button href={'/logout'} onClick={this.onClick} label='Logout' className='button is-inverted is-danger' />
    )
  }
}

export default Logout
