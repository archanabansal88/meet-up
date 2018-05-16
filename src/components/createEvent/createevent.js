import React, {Component} from 'react'
import Button from '../../shared/button'
import Input from '../../shared/input'
import TextArea from '../../shared/textarea'
import config from '../../config/index'
import './style.css'

class CreateEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      url: '',
      description: '',
      showErrorMsg: false
    }
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }

  handleInputChange (type, e) {
    this.setState({
      [type]: e.target.value
    })
  }
  handleValidation () {
    const {name, location, url, description} = this.state
    let hasError = false

    if (!name || !location || !url || !description) {
      hasError = true
    }
    if (!hasError) {
      return true
    }
  }
  handleSubmitClick (e) {
    e.preventDefault()
    this.setState({showErrorMsg: false})

    if (this.handleValidation()) {
      const {name, location, url, description} = this.state
      const obj = {title: name, location, url, description, dateTime: new Date()}

      fetch(`${config.url}api/event/create`, {
        body: JSON.stringify(obj),
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.handleReset()
          }
        }).catch((reject) => {
          this.setState({showErrorMsg: true})
        })
    } else {
      this.setState({showErrorMsg: true})
    }
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
          {this.state.showErrorMsg && <div>Sorry, We are unable to create an event due to a technical glitch</div>}
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
            <TextArea name='textarea' rows='10' cols='40' placeholder='Enter description here' onChange={this.handleInputChange.bind(this, 'description')} value={this.state.description} />
            <Button label='Create' onClick={this.handleSubmitClick} className='event-form__button' />
          </form>
        </div>
      </div>
    )
  }
}

export default CreateEvent
