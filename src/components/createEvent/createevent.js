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
      description: '',
      showErrorMsg: false,
      image: null
    }
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.fileChangedHandler = this.fileChangedHandler.bind(this)
  }

  handleInputChange (type, e) {
    this.setState({
      [type]: e.target.value
    })
  }
  handleValidation () {
    const {name, address1, pinCode, description, image} = this.state
    if (!name || !address1 || !pinCode || !image || !description) {
      return false
    }
    return true
  }
  handleSubmitClick (e) {
    e.preventDefault()
    this.setState({showErrorMsg: false})

    if (this.handleValidation()) {
      const {name, address1, address2, address3, pinCode, description, image} = this.state
      const formData = new window.FormData()
      formData.append('file', image)
      formData.append('title', name)
      formData.append('address1', address1)
      formData.append('address2', address2)
      formData.append('address3', address3)
      formData.append('pinCode', pinCode)
      formData.append('description', description)
      formData.append('dateTime', new Date())

      http.postFile(`${config.url}api/event/create`, formData)
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

  fileChangedHandler (event) {
    this.setState({image: event.target.files[0]})
  }

  handleReset () {
    this.setState({
      name: '',
      address1: '',
      address2: '',
      address3: '',
      pinCode: '',
      description: '',
      image: null
    })
  }

  render () {
    const {name, address1, address2, address3, pinCode, description, image} = this.state
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
              value={name}
              isHorizontal
            />
            <Input
              type='text'
              label='Address line 1'
              onChange={this.handleInputChange.bind(this, 'address1')}
              value={address1}
              isHorizontal
            />
            <Input
              type='text'
              label='Address line 2'
              onChange={this.handleInputChange.bind(this, 'address2')}
              value={address2}
              isHorizontal
            />

            <Input
              type='text'
              label='Address line 3'
              onChange={this.handleInputChange.bind(this, 'address3')}
              value={address3}
              isHorizontal
            />

            <Input
              type='number'
              label='Pin Code'
              onChange={this.handleInputChange.bind(this, 'pinCode')}
              value={pinCode}
              isHorizontal
            />
            <div className='field'>
              <div className='label'>Event image</div>
              <div className='file'>
                <label className='file-label'>
                  <input className='file-input' type='file' accept='image/*' name='image' onChange={this.fileChangedHandler} />
                  <span className='file-cta'>
                    <span className='file-icon'>
                      <i className='fas fa-upload' />
                    </span>
                    <span className='file-label'>
                        Choose a file…
                    </span>
                  </span>
                  {image && <span className='file-name'>
                    {image.name}
                  </span>}
                </label>
              </div>
            </div>
            <TextArea isHorizontal name='textarea' label='Event Description' placeholder='Enter description here' onChange={this.handleInputChange.bind(this, 'description')} value={description} />
            <Button className='button is-primary' label='Create Event' onClick={this.handleSubmitClick} />
          </form>
        </div>
      </div>
    )
  }
}

export default CreateEvent
