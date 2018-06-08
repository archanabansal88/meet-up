import React, {Component} from 'react'
import Button from '../../shared/button'
import Input from '../../shared/input'
import TextArea from '../../shared/textarea'
import config from '../../config/index'
import http from '../../helper/http'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: props.profile,
      checkbox: props.profile.display,
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
    const {first, history, isLoggedin} = this.props
    // Redirect logic
    if (!isLoggedin) {
      console.log('redirecting from isLoggedin', history, this.props)
      history.go(-1)
      return (null)
    }
    if (this.state.submit) {
      console.log('redirecting from submit')
      history.go(-1)
      return (null)
    }
    // Profile render
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
            readOnly
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
              ? <Button className='button is-text' label='Cancel' onClick={() => history.go(-1)} />
              : null}
          </div>
        </form>
      </div>
    )
  }
}

export default Profile
