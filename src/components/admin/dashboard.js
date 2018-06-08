import React, {Component} from 'react'
import EventContainer from '../eventContainer'

class DashBoard extends Component {
  render () {
    return (
      <div>
        <EventContainer onEventClick={this.props.onEventClick} />
      </div>
    )
  }
}

export default DashBoard
