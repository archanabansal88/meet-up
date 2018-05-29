import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import config from '../../config/index'
import http from '../../helper/http'
import './style.css'

class Profile extends Component {
  constructor (props) {
    super()
    this.state = {
      profile: props.profile,
      checkbox: true,
      submit: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const data = Object.assign(this.state.profile, {
      name: e.target.name.value,
      email: e.target.email.value,
      aboutme: e.target.aboutme.value,
      display: this.state.checkbox
    })
    http.post(`${config.url}api/user/login`, data)
      .then((response) => {
        if (response.status === 200) {
          this.props.handleFirst()
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
    const {name, email, aboutme, display} = this.state.profile
    const {first, redirect} = this.props
    // Redirect logic
    if (!this.props.isLoggedin) {
      if (redirect[redirect.length - 1]) {
        return (
          <Redirect to={redirect[redirect.length - 1]} />
        )
      }
      return (
        <Redirect to='/' />
      )
    }
    if (this.state.submit) {
      this.props.handleRedirect(this.props.history.location.pathname)
      this.props.handleFirst()
      return (
        <Redirect to={redirect[redirect.length - 2]} />
      )
    }
    // Profile render
    return (
      <form className='userform' onSubmit={this.handleSubmit}>
        <div className='field'>
          <label className='label'>Name</label>
          <div className='control'>
            <input className='input' type='text' placeholder='My name is' defaultValue={name} name='name' />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Email</label>
          <div className='control'>
            <input className='input' type='email' placeholder='My Email ID is...' defaultValue={email} name='email' />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Tell us about yourself</label>
          <div className='control'>
            <textarea className='textarea' placeholder='I like BangaloreJS' name='aboutme' defaultValue={aboutme || null} />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Display profile picture</label>
          <div className='control'>
            <label className='checkbox'>
              <input type='checkbox' name='display' defaultChecked={display} onChange={this.handleUncheck.bind(this)} />
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
              <button className='button is-text' >Cancel</button>
            </div> : null}
        </div>
      </form>
    )
  }
}

export default Profile
