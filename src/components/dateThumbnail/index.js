import React from 'react'
import './style.css'

console.log('test')
export const DateTimeLong = ({date}) => {
  console.log(date)
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <div className='event-title__date'>
      {formattedDate}
    </div>
  )
}

export const DateTimeShort = ({date}) => {
  console.log(date)
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString('en-US', {month: 'short'})
  const newDate = dateObj.getDate()
  return (
    <div className='event-date'>
      <div className='event-date__day'>{newDate}</div>
      <div className='event-date__month'>{month}</div>
    </div>
  )
}
