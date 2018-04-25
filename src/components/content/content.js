import React from 'react'
import EventContainer from '../eventContainer'
import './style.css'

const Content = ({history}) => {
  return (
    <div>
      <div className='content' />
      <EventContainer history={history} />
    </div>
  )
}

export default Content
