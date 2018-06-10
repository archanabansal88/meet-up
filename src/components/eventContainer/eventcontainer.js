import React, {Component} from 'react'
import Carousel from '../../shared/carousel'
import EventList from './eventList'
import EventCard from '../eventCard'
import config from '../../config/index'
import http from '../../helper/http'

class EventContainer extends Component {
  constructor (props) {
    super()
    this.state = {
      events: false,
      showErrorMsg: false
    }
  }

  componentDidMount () {
    http.get(`${config.url}api/event/`)
      .then(response => {
        return response.json()
      })
      .then((events) => {
        this.setState({events})
      }).catch((reject) => {
        this.setState({showErrorMsg: true})
      })
  }

  render () {
    const {events, showErrorMsg} = this.state
    const {onEventClick, showCarousel} = this.props
    return (
      <div className='container section'>
        <h2 className='title is-4'>Events</h2>
        {showErrorMsg && <div>There is a problem getting list of events.Please try after some time</div>}
        {events && events.length > 0 &&
          <div>
            {showCarousel
              ? <Carousel>
                {events.map((event, index) => {
                  return (
                    <div key={index} className='is-inline-block'>
                      <EventCard event={event} onEventClick={onEventClick} />
                    </div>
                  )
                })}
              </Carousel>
              : <div className='columns is-multiline'><EventList onEventClick={onEventClick} events={events} /></div>
            }
          </div>
        }
      </div>
    )
  }
}

export default EventContainer
