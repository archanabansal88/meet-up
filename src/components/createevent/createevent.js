import React from 'react'
import Button from '../../shared/button'
import Input from '../../shared/input'
import './style.css'

class CreateEvent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      url: '',
      description: ''
    }
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }

  handleInputChange (type, e) {
    this.setState({
      [type]: e.target.value
    })
  }

  handleSubmitClick (e) {
    e.preventDefault()
    console.log('Event Name:', this.state.name)
    console.log('Event location:', this.state.location)
    console.log('Event url:', this.state.url)
    console.log('Event description:', this.state.description)

    this.handleReset()
  }

  handleReset () {
    this.setState({
      name: '',
      location: '',
      url: '',
      description: ''
    })
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
              onChange={this.handleInputChange.bind(this, 'name')}
              isValid
              value={this.state.name}
            />
            <Input
              type='text'
              label='Event Location'
              isValid
              onChange={this.handleInputChange.bind(this, 'location')}
              value={this.state.location}
            />
            <Input
              type='url'
              label='Event Url'
              isValid
              onChange={this.handleInputChange.bind(this, 'url')}
              value={this.state.url}
            />
            <textarea name='textarea' rows='10' cols='40' placeholder='Enter description here' onChange={this.handleInputChange.bind(this, 'description')} value={this.state.description} />
            <Button label='Create' onClick={this.handleSubmitClick} className='event-form__button' />
          </form>
        </div>
      </div>
    )
  }
}

export default CreateEvent
