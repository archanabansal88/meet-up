import React, {Component} from 'react'

import './style.css'

class Profile extends Component {
  constructor (props) {
    super(props)
    console.log(this.props, 'there are the props')
  }
  render () {
    return (
      <div className='userform'>
        <div className='field'>
          <label className='label'>Name</label>
          <div className='control'>
            <input className='input' type='text' placeholder='Text input' />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Email</label>
          <div className='control has-icons-left has-icons-right'>
            <input className='input is-danger' type='email' placeholder='Email input' defaultValue='hello@' />
            <span className='icon is-small is-left'>
              <i className='fas fa-envelope' />
            </span>
            <span className='icon is-small is-right'>
              <i className='fas fa-exclamation-triangle' />
            </span>
          </div>
          <p className='help is-danger'>This email is invalid</p>
        </div>
        <div className='field'>
          <label className='label'>About Me</label>
          <div className='control'>
            <textarea className='textarea' placeholder='Textarea' />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Display profile picture</label>
          <div className='control'>
            <label className='radio'>
              <input type='radio' name='question' />
      Yes
            </label>
            <label className='radio'>
              <input type='radio' name='question' />
      No
            </label>
          </div>
        </div>

        <div className='field is-grouped'>
          <div className='control'>
            <button className='button is-link'>Submit</button>
          </div>
          <div className='control'>
            <button className='button is-text'>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
