import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import config from '../../config/index'

import './style.css'

class Profile extends Component {
  constructor (props) {
    super()
    this.state = {
      profile: props.profile,
      checkbox: true,
      submit: false
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    const data = Object.assign(this.state.profile, {
      name: e.target.name.value,
      email: e.target.email.value,
      aboutme: e.target.aboutme.value,
      display: this.state.checkbox
    })
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
          console.log(this.props.history)
          this.props.handleRedirect()
          this.props.history.push('/')
          this.setState({
            submit: true
          })
        }
      })
  }

  handleUncheck () {
    this.setState({
      checkbox: !this.state.checkbox
    })
  }

  render () {
    const {name, email} = this.state.profile
    const {first} = this.props.first
    console.log(this.props, first)
    if (this.state.submit) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <form className='userform' onSubmit={this.handleSubmit.bind(this)}>
        <div className='field'>
          <label className='label'>Name</label>
          <div className='control'>
            <input className='input' type='text' defaultValue={name} name='name' />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Email</label>
          <div className='control has-icons-left has-icons-right'>
            <input className='input' type='email' placeholder='Email input' defaultValue={email} name='email' />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Tell us about yourself</label>
          <div className='control'>
            <textarea className='textarea' placeholder='Textarea' name='aboutme' />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Display profile picture</label>
          <div className='control'>
            <label className='checkbox'>
              <input type='checkbox' name='display' defaultChecked onChange={this.handleUncheck.bind(this)} />
      Yes
            </label>
          </div>
        </div>

        <div className='field is-grouped'>
          <div className='control'>
            <input className='button is-link' type='submit' value='Submit' />
          </div>
          {!first
            ? <div className='control'>
              <button className='button is-text'>Cancel</button>
            </div> : null}
        </div>
      </form>
    )
  }
}

export default Profile
