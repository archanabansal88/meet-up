import React from 'react'

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
    <div className='column'>
      <div className='message column card has-background-light has-text-centered'>
        <div className='has-text-weight-bold is-size-5 has-text-danger'>{newDate}</div>
        <div className='is-uppercase has-text-dark'>{month}</div>
      </div>
    </div>
  )
}
