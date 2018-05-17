import React, {Component} from 'react'

import './style.css'

class Profile extends Component {
  constructor (props) {
    super()
  }
  render () {
    console.log(this.props)
    return (
      <div> Welcome to Profile Page </div>
    )
  }
}

export default Profile
