import React, {Component} from 'react'
import Button from '../../shared/button'
import Input from '../../shared/input'
import TextArea from '../../shared/textarea'
import config from '../../config/index'
import http from '../../helper/http'

class CreateEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      address1: '',
      address2: '',
      address3: '',
      pinCode: '',
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
    const {name, address1, pinCode, url, description} = this.state
    if (!name || !address1 || !pinCode || !url || !description) {
      return false
    }
    return true
  }
  handleSubmitClick (e) {
    e.preventDefault()
    this.setState({showErrorMsg: false})

    if (this.handleValidation()) {
      const {name, address1, address2, address3, pinCode, url, description} = this.state
      const obj = {title: name, address1, address2, address3, pinCode, url, description, dateTime: new Date()}

      http.post(`${config.url}api/event/create`, obj)
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
    const {name, location, url, description} = this.state
    return (
      <div className='hero-body container'>
        <div>
          <h1 className='title'>Create a new Event</h1>
          {this.state.showErrorMsg && <div>Sorry, We are unable to create an event due to a technical glitch</div>}
          <form className='notification'>
            <Input
              type='text'
              label='Event Name'
              onChange={this.handleInputChange.bind(this, 'name')}
              isValid
              value={name}
              isHorizontal
            />
            <Input
              type='text'
              label='Address line 1'
              isValid
              onChange={this.handleInputChange.bind(this, 'address1')}
              value={location}
              isHorizontal
            />
            <Input
              type='text'
              label='Address line 2'
              isValid
              onChange={this.handleInputChange.bind(this, 'address2')}
              value={location}
              isHorizontal
            />

            <Input
              type='text'
              label='Address line 3'
              isValid
              onChange={this.handleInputChange.bind(this, 'address3')}
              value={location}
              isHorizontal
            />

            <Input
              type='number'
              label='Pin Code'
              isValid
              onChange={this.handleInputChange.bind(this, 'pinCode')}
              value={location}
              isHorizontal
            />
            <Input
              type='url'
              label='Event Url'
              isValid
              onChange={this.handleInputChange.bind(this, 'url')}
              value={url}
              isHorizontal
            />
            <TextArea isHorizontal name='textarea' label='Event Description' placeholder='Enter description here' onChange={this.handleInputChange.bind(this, 'description')} value={description} />
            <div className='field is-horizontal'>
              <div className='field-label' />
              <div className='field-body'>
                <div className='field'>
                  <Button className='button is-primary' label='Create Event' onClick={this.handleSubmitClick} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateEvent
