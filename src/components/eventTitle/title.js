import React from 'react'
import {DateTimeLong} from '../dateThumbnail'
import './style.css'

const Title = ({title, dateTime}) => {
  return (
    <div className='event-title'>
      <DateTimeLong date={dateTime} />
      <h1 className='event-title__header'>{title}</h1>
    </div>
  )
}

export default Title
