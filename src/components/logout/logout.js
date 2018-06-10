import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Button from '../../shared/button'
import config from '../../config/index'
import http from '../../helper/http'

class Logout extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  signOut () {
    const auth2 = window.gapi.auth2.getAuthInstance()
    return auth2.disconnect()
  }
  componentDidMount () {

  }
  onClick () {
    http.delete(`${config.url}api/user/logout`, {})
      .then(() => {
        console.log('logout')
        this.signOut()
      }).then(() => {
        this.props.history.push('/')
        this.props.onLogoutSuccess()
        if (this.props.first) {
          this.props.handleFirst()
        }
      })
  }

  render () {
    return (
      <div>
        <Button onClick={this.onClick} label='Logout' className='button is-inverted is-danger' />
      </div>
    )
  }
}

export default withRouter(Logout)
