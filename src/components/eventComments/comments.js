import React, {Component} from 'react'
import {DateTimeLong} from '../dateThumbnail'
import TextArea from '../../shared/textarea'
import Button from '../../shared/button'
import HttpClient from '../../helper/httpClient'
import config from '../../config/index'
import './style.css'

class Comments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }

  handleInputChange (e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmitClick (e) {
    e.preventDefault()
    const {email, eventId, eventDetails} = this.props
    const {message} = this.state
    if (message) {
      const obj = {message, email: email.getEmail(), eventId}

      HttpClient.post(`${config.url}api/event/comment`, obj)
        .then((response) => {
          if (response.status === 200) {
            this.handleReset()
            eventDetails()
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
      message: ''
    })
  }

  render () {
    const {message} = this.state
    const {isLoggedin, comments} = this.props
    return (
      <section className='event-comments'>
        <h2 className='subtitle'>Comments</h2>
        {isLoggedin &&
          <div>
            <TextArea name='textarea' placeholder='Enter comment' onChange={this.handleInputChange} value={message} />
            <Button label='Add Comment' onClick={this.handleSubmitClick} className='button is-link' />
          </div>
        }
        {comments && comments.length ? <ul className='event-comments__list'>
          {comments.map((comment, index) => {
            return (
              <li className='event-comments__item'>
                <img className='event-comments__user-image' src={comment.image} />
                <div className='event-comments__user-details'>
                  <h6 className='event-comments__user-name'>{comment.name}</h6>
                  <div className='event-comments__user-message'>{comment.message}</div>
                  <DateTimeLong date={comment.dateTime} />
                </div>
              </li>
            )
          })}
        </ul> : <div className='event-comments__none'>No Comments</div>}
      </section>
    )
  }
}

export default Comments
