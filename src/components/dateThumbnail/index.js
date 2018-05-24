import React from 'react'
import './style.css'

export const DateTimeLong = ({date}) => {
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <div className='has-text-grey'>
      {formattedDate}
    </div>
  )
}

export const DateTimeShort = ({date}) => {
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString('en-US', {month: 'short'})
  const newDate = dateObj.getDate()
  return (
    <div className='event-date has-background-light'>
      <div className='event-date__day has-text-danger'>{newDate}</div>
      <div className='event-date__month has-text-dark'>{month}</div>
    </div>
  )
}
