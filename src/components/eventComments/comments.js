import React from 'react'
import {DateTimeLong} from '../dateThumbnail'
import './style.css'

const Message = ({comment}) => {
  return (
    <li className='event-comments__item'>
      <h6 className='event-comments__name'>{comment.name}</h6>
      <p className='event-comments__message'>{comment.message}</p>
      <DateTimeLong date={comment.time} />
    </li>
  )
}

const Comment = ({comments}) => {
  return (
    <section className='event-comments'>
      <h2 className='event-comments__title'>Comments</h2>
      <ul className='event-comments__list'>
        {comments.map((comment, index) => <Message key={index} comment={comment} />)}
      </ul>
    </section>
  )
}

export default Comment
