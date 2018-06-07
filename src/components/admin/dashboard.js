import React, {Component} from 'react'
import EventContainer from '../eventContainer'

class DashBoard extends Component {
  constructor (props) {
    super(props)
    this.handleEventClick = this.handleEventClick.bind(this)
  }

  handleEventClick (event) {
    console.log(event.id)
  }
  render () {
    console.log('call the dash board')
    return (
      <div>
        <EventContainer onEventClick={this.handleEventClick} />
      </div>
    )
  }
}

export default DashBoard
