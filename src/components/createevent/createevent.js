import React from 'react'
import Button from '../../shared/button'
import Input from '../../shared/input'
import './style.css'

class CreateEvent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      venue: '',
      url: ''
    }
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }

  validateInput (type, e) {
    const input = this.state[type]
    this.setState({
      [type]: e.target.value
    })
  }

  handleSubmitClick (e) {
    e.preventDefault()
    console.log('Event Name:', this.state.name)
    console.log('Event venue:', this.state.venue)
    console.log('Event url:', this.state.url)
  }

  render () {
    return (
      <div className='event-form'>
        <div>
          <h1 className='event-form__title'>Create a new Event</h1>
          <form className='event-form__container'>
            <Input
              type='text'
              label='Event Name'
              onChange={this.validateInput.bind(this, 'name')}
              isValid
              value={this.state.name}
            />
            <Input
              type='text'
              label='Event Venue'
              isValid
              onChange={this.validateInput.bind(this, 'venue')}
              value={this.state.venue}
            />
            <Input
              type='url'
              label='Event Url'
              isValid
              onChange={this.validateInput.bind(this, 'url')}
              value={this.state.url}
            />
            <textarea name='textarea' rows='10' cols='40' placeholder='Enter description here' />
            <Button label='create' onClick={this.handleSubmitClick} className='event-form__button' />
          </form>
        </div>
      </div>
    )
  }
}

export default CreateEvent
