import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {DateTimeShort, DateTimeLong} from '../dateThumbnail'
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
      isLocationLoaded: false
    }
    this.handleYesButtonClick = this.handleYesButtonClick.bind(this)
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    this.getEventDetails = this.getEventDetails.bind(this)
    this.handleEventAttending = this.handleEventAttending.bind(this)
    this.checkAttendee = this.checkAttendee.bind(this)
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

  componentWillMount () {
    this.getEventDetails()
    // console.log(this.props.yes, this.props.profile, 'component will mount')
    // if (this.props.yes && this.props.profile.email) {
    //   console.log('this was triggered')
    //   this.handleEventAttending()
    // }
  }

  componentDidUpdate () {
    // if (!this.props.profile.email && this.props.yes) {
    //   this.handleEventAttending()
    // }
  }

  handleEventAttending () {
    let {profile} = this.props
    if (profile.email) {
      console.log(profile.email, 'handleEventAttending')
      this.props.handleYes(false)
      this.handleAttendee(profile.email, this.state.event.id, `${config.url}api/event/attendee`)
    }
  }

  handleYesButtonClick () {
    let {isLoggedin, profile, handleYes} = this.props
    handleYes(true)
    if (isLoggedin) {
      return this.handleEventAttending()
    }
    this.setState({showPopUp: true})
    // if (!isLoggedin) {
    //   this.setState({showPopUp: true})
    //   this.props.handleYes(true)
    //   return console.log(profile, 'handleYesButtonClick')
    // }
    // console.log(this.props.yes, profile)
    // if (this.props.yes && profile.email) {
    //   this.handleAttendee(profile.email, this.state.event.id, `${config.url}api/event/attendee`)
    //   this.props.handleYes(false)
    // }
  }

  handleAttendee (email, eventId, url) {
    http.post(url, {email, eventId})
      .then((response) => {
        if (response.status === 200) {
          this.getEventDetails()
        }
      })
  }

  handleCancelButtonClick () {
    const {profile, handleYes} = this.props
    handleYes(false)
    this.handleAttendee(profile.email, this.state.event.id, `${config.url}api/event/attendee/cancel`)
  }

  handleCloseClick () {
    this.props.handleYes(false)
    this.setState({showPopUp: false})
  }

  handleLoginSuccess (authProfile) {
    this.setState({showPopUp: false})
    this.props.onLoginSuccess(authProfile, this.checkAttendee)
  }

  checkAttendee () {
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
              : <EventConfirm title='Do you want to attend the event?' label='Yes' onClick={this.handleYesButtonClick} />
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
                  <section className='message-body'>
                    <div>{event.address1}</div>
                    <div>{event.address2}</div>
                    <div>{event.address3}</div>
                    <DateTimeLong date={event.dateTime} />
                  </section>
                  <div id='map' style={{height: '500px'}} />
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
