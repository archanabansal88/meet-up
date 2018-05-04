import React, {Component} from 'react'
// import {Link} from 'react-router-dom'

import config from '../../config/index'

import './style.css'
class Logout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: `${config.url}` + 'logout'
    }
  }
  render () {
    return (
      <a className='logout' href={this.state.redirect} target='_self'>logout</a>
    )
  }
}

export default Logout
