import React, {Component} from 'react'
import {DateTimeLong} from '../dateThumbnail'
import TextArea from '../../shared/textarea'
import Button from '../../shared/button'
import http from '../../helper/http'
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
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
  }

  handleInputChange (e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmitClick (e) {
    e.preventDefault()
    const {profile, eventId, eventDetails} = this.props
    const {message} = this.state

    const obj = {message, email: profile.getEmail(), eventId}

    http.post(`${config.url}api/event/comment`, obj)
      .then((response) => {
        if (response.status === 200) {
          this.handleReset()
          eventDetails()
        }
      }).catch((reject) => {
        this.setState({showErrorMsg: true})
      })
  }

  handleReset () {
    this.setState({
      message: ''
    })
  }

  handleDeleteComment (comment) {
    const {eventId, eventDetails} = this.props
    const obj = {commentId: comment.commentId, eventId}

    http.delete(`${config.url}api/event/comment`, obj)
      .then((response) => {
        eventDetails()
      })
  }

  render () {
    const {message} = this.state
    const {isLoggedin, comments, profile} = this.props
    return (
      <section className='event-comments'>
        <h2 className='subtitle'>Comments</h2>
        {isLoggedin &&
          <div>
            <TextArea name='textarea' placeholder='Enter comment' onChange={this.handleInputChange} value={message} />
            <Button label='Add Comment' onClick={this.handleSubmitClick} className='button is-link' disabled={message.length === 0} />
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
                  {isLoggedin && comment.email === profile.getEmail() &&
                  <Button label='Delete' onClick={this.handleDeleteComment.bind(null, comment)} className='button is-danger' />
                  }
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
