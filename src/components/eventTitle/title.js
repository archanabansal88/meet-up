import React from 'react'
import {DateTimeLong} from '../dateThumbnail'

const Title = ({title, dateTime}) => {
  const lineClampStyle = {
    'display': '-webkit-box',
    'WebkitLineClamp': '2',
    'WebkitBoxOrient': 'vertical',
    'overflow': 'hidden'
  }
  return (
    <div >
      <DateTimeLong date={dateTime} />
      <h1 className='title' style={lineClampStyle}>{title}</h1>
    </div>
  )
}

export default Title
