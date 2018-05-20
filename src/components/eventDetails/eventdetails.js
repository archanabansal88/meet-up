import React, {Component} from 'react'
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
import './style.css'

class EventDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      event: false,
      showErrorMsg: false,
      showPopUp: false
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
        this.setState({event: event[0]})
      })
      .catch((reject) => {
        this.setState({showErrorMsg: true})
      })
  }

  componentDidMount () {
    this.getEventDetails()
  }

  handleYesButtonClick () {
    const {isLoggedin, profile} = this.props
    if (!isLoggedin) {
      this.setState({showPopUp: true})
    } else {
      this.handleAttendee(profile.getEmail(), this.state.event.id, `${config.url}api/event/attendee`)
    }
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
    const {profile} = this.props
    this.handleAttendee(profile.getEmail(), this.state.event.id, `${config.url}api/event/attendee/cancel`)
  }

  handleCloseClick () {
    this.setState({showPopUp: false})
  }

  handleLoginSuccess (profile) {
    this.setState({showPopUp: false})
    const {event} = this.state
    const list = event.attendees.filter((attendee) => attendee.email === profile.getEmail())
    if (!list.length) {
      this.handleAttendee(profile.getEmail(), event.id, `${config.url}api/event/attendee`)
    }
  }

  render () {
    const {event, showPopUp} = this.state
    const {isLoggedin, profile} = this.props
    const isUserAttending = event && profile && event.attendees && event.attendees.filter((attendee) =>
      attendee.email === profile.getEmail()
    )[0]

    return (
      <main className='event-details'>
        {showPopUp && <PopUp onClose={this.handleCloseClick} title='Sign in'><GoogleOauth onLoginSuccess={this.handleLoginSuccess} /></PopUp>}
        <div className='event-details__header-wrapper'>
          <section className='event-details__header'>
            <article className='event-details__heading'>
              <DateTimeShort date={event.dateTime} />
              <Title {...event} />
            </article>
            {isUserAttending
              ? <EventConfirm title='You are attending the event' label='Cancel' onClick={this.handleCancelButtonClick} />
              : <EventConfirm title='Do you want to attend the event' label='Yes' onClick={this.handleYesButtonClick} />
            }
          </section>
        </div>
        <section className='event-details__content'>
          <article className='event-details__container'>
            <Description description={event.description} />
            <Attendees attendees={event.attendees} />
            <Comments comments={event.comments} isLoggedin={isLoggedin} eventId={event.id} email={profile} eventDetails={this.getEventDetails} />
          </article>
          <article className='event-details__location'>
          Location
          </article>
        </section>
      </main>
    )
  }
}

export default EventDetails
