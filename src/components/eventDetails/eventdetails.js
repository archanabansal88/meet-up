import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {DateTimeShort} from '../dateThumbnail'
import Title from '../eventTitle/title'
import Description from '../eventDescription/description'
import Attendees from '../eventAttendees/attendees'
import Comments from '../eventComments/comments'
import http from '../../helper/http'
import config from '../../config/index'
import PopUp from '../../shared/popup'
import GoogleOauth from '../googleOauth'
import EventConfirm from './eventconfirm'
import renderMap from './map'

class EventDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      event: false,
      showErrorMsg: false,
      showPopUp: false,
      isLocationLoaded: false,
      profile: props.profile
    }
    this.handleYesButtonClick = this.handleYesButtonClick.bind(this)
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    this.getEventDetails = this.getEventDetails.bind(this)
  }

  getEventDetails () {
    http.get(`${config.url}api/event/${this.props.match.params.id}`)
      .then(response => response.json())
      .then((event) => {
        const {isLocationLoaded} = this.state
        this.setState({event: event[0], isLocationLoaded: true})
        if (!isLocationLoaded) { this.getLatLng() }
      })
      .catch((reject) => {
        this.setState({showErrorMsg: true})
      })
  }

  getLatLng () {
    const {address1, address2, address3, pinCode} = this.state.event
    http.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${address1},${address2},${address3},${pinCode}`)
      .then(response => response.json())
      .then(response => {
        if (response.status === 'OK') {
          renderMap(response.results[0].geometry.location)
        }
      })
  }

  componentDidMount () {
    this.getEventDetails()
  }

  handleYesButtonClick () {
    let {isLoggedin, profile} = this.props
    if (!isLoggedin) {
      this.setState({showPopUp: true})
      console.log(profile, 'handleYesButtonClick')
    } else {
      this.handleAttendee(profile.email, this.state.event.id, `${config.url}api/event/attendee`)
    }
  }

  handleAttendee (email, eventId, url) {
    http.post(url, JSON.stringify({email, eventId}))
      .then((response) => {
        if (response.status === 200) {
          this.getEventDetails()
        }
      })
  }

  handleCancelButtonClick () {
    const {profile} = this.props
    this.handleAttendee(profile.email, this.state.event.id, `${config.url}api/event/attendee/cancel`)
  }

  handleCloseClick () {
    this.setState({showPopUp: false})
  }

  handleLoginSuccess (authProfile) {
    this.setState({showPopUp: false})
    this.props.onLoginSuccess(authProfile)
    const {event} = this.state
    const list = event.attendees.filter((attendee) => attendee.email === this.props.profile.email)[0]
    if (!list) {
      this.handleAttendee(this.props.profile.email, event.id, `${config.url}api/event/attendee`)
    }
  }

  render () {
    const {event, showPopUp} = this.state
    const {isLoggedin, profile, first} = this.props
    if (!event) {
      return null
    }
    const isUserAttending = isLoggedin && event.attendees.filter((attendee) =>
      attendee && attendee.email === profile.email
    )[0]
    // profile redirect for first-time login
    if (first) {
      this.props.handleRedirect(this.props.history.location.pathname)
      return (
        <Redirect to='/profile' />
      )
    }
    console.log(isLoggedin, profile, 'rendered')
    return (
      <main>
        {showPopUp && <PopUp onClose={this.handleCloseClick} title='Sign in'><GoogleOauth onLoginSuccess={this.handleLoginSuccess} /></PopUp>}
        <div className='card'>
          <section className='level container card-content'>
            <article className='level-left'>
              <DateTimeShort date={event.dateTime} />
              <Title {...event} />
            </article>
            {isUserAttending
              ? <EventConfirm title='You are attending the event' label='Cancel' onClick={this.handleCancelButtonClick} />
              : isLoggedin && profile.email
                ? <EventConfirm title='Do you want to attend the event?' label='Yes' onClick={this.handleYesButtonClick} />
                : <h2>Sign-in to register for this event</h2>
            }
          </section>
        </div>
        <section className='hero-body has-background-light'>
          <div className='container'>
            <div className='columns'>
              <article className='column is-two-thirds'>
                <Description description={event.description} />
                <Attendees attendees={event.attendees} />
                <Comments comments={event.comments} isLoggedin={isLoggedin} eventId={event.id} profile={profile} eventDetails={this.getEventDetails} />
              </article>
              <article className='column'>
                <div className='message is-info'>
                  <h2 className='message-header'>Location</h2>
                  <section className='message-body' id='map' style={{height: '600px'}}>
                    <div>{event.address1}</div>
                    <div>{event.address2}</div>
                    <div>{event.address3}</div>
                    <div>{event.pinCode}</div>
                  </section>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default EventDetails
