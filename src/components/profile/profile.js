import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Button from '../../shared/button'
import Input from '../../shared/input'
import TextArea from '../../shared/textarea'
import config from '../../config/index'
import http from '../../helper/http'

class Profile extends Component {
  constructor (props) {
    super()
    this.state = {
      profile: props.profile,
      checkbox: true,
      submit: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUncheck = this.handleUncheck.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const data = Object.assign(this.state.profile, {
      name: e.target.name.value,
      email: e.target.email.value,
      aboutme: e.target.aboutme.value,
      display: this.state.checkbox
    })
    http.post(`${config.url}api/user/login`, JSON.stringify(data))
      .then((response) => {
        if (response.status === 200) {
          this.props.handleRedirect()
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
    if (this.state.submit || !this.props.isLoggedin) {
      this.props.handleRedirect()
      return (
        <Redirect to='/' />
      )
    }
    const {name, email, aboutme, display} = this.state.profile
    const {first} = this.props.first
    return (
      <div className='hero-body container'>
        <h1 className='title'>Welcome {name}</h1>
        <form className='notification' onSubmit={this.handleSubmit}>
          <Input
            type='text'
            label='Name'
            placeholder='My name is'
            name='name'
            defaultValue={name}
          />
          <Input
            type='email'
            label='Email'
            placeholder='My Email ID is...'
            name='email'
            defaultValue={email}
          />
          <TextArea
            name='aboutme'
            label='Tell us about yourself'
            placeholder='I like BangaloreJS'
            defaultValue={aboutme || null}
          />
          <div className='field'>
            <label className='label'>Display profile picture</label>
            <div className='control'>
              <label className='checkbox'>
                <input type='checkbox' name='display' defaultChecked={display} onChange={this.handleUncheck} />
                    Yes
              </label>
            </div>
          </div>

          <div className='field is-grouped'>
            <div className='control'>
              <input className='button is-link' type='submit' value='Submit' />
            </div>
            {!first
              ? <Button className='button is-text' label='Cancel' />
              : null}
          </div>
        </form>
      </div>
    )
  }
}

export default Profile
