import React from 'react'
import Button from '../../shared/button'
import Input from '../../shared/input'
import './style.css'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userid: {
        isValid: true,
        value: ''
      },
      password: {
        isValid: true,
        value: ''
      }
    }
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }

  validateInput (type, e) {
    const input = this.state[type]
    input.value = e.target.value
    input.isValid = true
    this.setState({
      [type]: input
    })
  }

  handleValidation () {
    const { userid, password } = this.state
    let hasError = false

    if (!userid.value || !/^[a-zA-Z ]+$/g.test(userid.value)) {
      userid.isValid = false
      hasError = true
    }

    if (!password.value) {
      password.isValid = false
      hasError = true
    }

    if (!hasError) {
      return true
    }

    this.setState({
      userid,
      password
    })
  }

  handleSubmitClick (e) {
    e.preventDefault()
    if (this.handleValidation()) {
      // Make Request for login
    }
  }

  render () {
    return (
      <div className='login-form'>
        <div>
          <h1 className='login-form__title'>Sign in to your account</h1>
          <form className='login-form__container'>
            <Input
              type='text'
              label='User ID'
              onChange={this.validateInput.bind(this, 'userid')}
              errorMsg='Please Enter your User ID'
              isValid={this.state.userid.isValid}
              value={this.state.userid.value}
            />
            <Input
              type='password'
              label='Password'
              onChange={this.validateInput.bind(this, 'password')}
              errorMsg='Please Enter your Password'
              isValid={this.state.password.isValid}
              value={this.state.password.value}
            />
            <Button label='Sign in' onClick={this.handleSubmitClick} className='login-form__button' />
          </form>
        </div>
      </div>
    )
  }
}

export default Login
