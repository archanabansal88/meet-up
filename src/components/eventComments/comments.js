import React, {Component} from 'react'
import {DateTimeLong} from '../dateThumbnail'
import TextArea from '../../shared/textarea'
import Button from '../../shared/button'
import http from '../../helper/http'
import config from '../../config/index'

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
      <section className='section'>
        <h2 className='title is-size-4'>Comments</h2>
        {isLoggedin &&
          <div>
            <TextArea placeholder='Enter comment' onChange={this.handleInputChange} value={message} />
            <Button label='Add Comment' onClick={this.handleSubmitClick} className='button is-link' disabled={message.length === 0} />
          </div>
        }
        {comments && comments.length ? <ul className='content'>
          {comments.map((comment, index) => {
            return (
              <li className='box'>
                <div className='media'>
                  <div className='media-left'>
                    <img className=' image is-20x20' style={{'border-radius': '50px'}} src={comment.image} />
                  </div>
                  <div className='media-content'>
                    <h6>{comment.name}</h6>
                    <div className='has-text-grey-dark subtitle is-size-6'>{comment.message}</div>
                    <DateTimeLong date={comment.dateTime} />
                  </div>
                  <div className='media-right'>
                    {isLoggedin && comment.email === profile.getEmail() &&
                    <Button onClick={this.handleDeleteComment.bind(null, comment)} className='delete is-large' />
                    }
                  </div>
                </div>
              </li>
            )
          })}
        </ul> : <div className='card section has-text-centered'>No Comments</div>}
      </section>
    )
  }
}

export default Comments
