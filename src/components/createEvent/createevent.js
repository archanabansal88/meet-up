import React, {Component} from 'react'
import Button from '../../shared/button'
import Input from '../../shared/input'
import TextArea from '../../shared/textarea'
import config from '../../config/index'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.min.css'

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
      image: null,
      date: moment().add(1, 'd').set({'hour': 10, 'minute': 0})
    }
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.fileChangedHandler = this.fileChangedHandler.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleInputChange (type, e) {
    this.setState({
      [type]: e.target.value
    })
  }

  handleDateChange (date) {
    this.setState({ date })
  }
  handleValidation () {
    const {name, address1, pinCode, description, image, date} = this.state
    if (!name || !address1 || !pinCode || !image || !date || !description) {
      return false
    }
    return true
  }
  handleSubmitClick (e) {
    e.preventDefault()
    this.setState({showErrorMsg: false})

    if (this.handleValidation()) {
      const {name, address1, address2, address3, pinCode, description, image, date} = this.state
      const formData = new window.FormData()
      formData.append('file', image)
      formData.append('title', name)
      formData.append('address1', address1)
      formData.append('address2', address2)
      formData.append('address3', address3)
      formData.append('pinCode', pinCode)
      formData.append('description', description)
      formData.append('dateTime', date)

      fetch(`${config.url}api/event/create`, {
        method: 'POST',
        credentials: 'same-origin',
        body: formData
      }).then((response) => {
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
      image: null,
      date: moment().add(1, 'd').set({'hour': 10, 'minute': 0})
    })
  }

  render () {
    const {name, address1, address2, address3, pinCode, description, image, date} = this.state
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
            <div className='field'>
              <div className='label'>Event date</div>
              <DatePicker
                selected={date}
                onChange={this.handleDateChange}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={30}
                dateFormat='LLL'
                minTime={moment().hours(10).minutes(0)}
                maxTime={moment().hours(17).minutes(0)}
                className='input'
              />
            </div>
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
