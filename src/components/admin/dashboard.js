import React from 'react'
import EventContainer from '../eventContainer'

const DashBoard = ({onEventClick}) => {
  return (
    <div>
      <EventContainer onEventClick={onEventClick} />
    </div>
  )
}

export default DashBoard
