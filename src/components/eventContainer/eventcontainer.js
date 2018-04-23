import React from 'react'
import Carousel from '../../shared/carousel'
import EventCard from '../eventCard'
import config from '../../config/index'
import './style.css'

class EventContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: false,
      showErrorMsg: false
    }
  }

  componentDidMount () {
    fetch(`${config.url}api/event`)
      .then(response => response.json())
      .then((events) => {
        this.setState({events})
      }).catch((reject) => {
        this.setState({showErrorMsg: true})
      })
  }

  render () {
    const {events, showErrorMsg} = this.state
    return (
      <div className='event'>
        {showErrorMsg && <div>There is a problem getting list of events.Please try after some time</div>}
        {events &&
        <Carousel>
          {events.map((event, index) => {
            return (
              <div key={index} className='eventlist'>
                <EventCard event={event} />
              </div>
            )
          })}
        </Carousel>}
      </div>
    )
  }
}

export default EventContainer
