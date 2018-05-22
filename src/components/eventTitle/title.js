import React from 'react'
import {DateTimeLong} from '../dateThumbnail'

const Title = ({title, dateTime}) => {
  return (
    <div >
      <DateTimeLong date={dateTime} />
      <h1 className='title'>{title}</h1>
    </div>
  )
}

export default Title
