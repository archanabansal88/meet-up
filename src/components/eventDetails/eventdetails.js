import React from 'react'
import {DateTimeShort} from '../dateThumbnail'
import Title from '../eventTitle/title'
import Description from '../eventDescription/description'
import Attendees from '../eventAttendees/attendees'
import Comments from '../eventComments/comments'
import Button from '../../shared/button'
import config from '../../config/index'
import PopUp from '../../shared/popup'
import GoogleOauth from '../googleOauth'
import './style.css'

class EventDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      event: false,
      showErrorMsg: false,
      showPopUp: false
    }
    this.handleYesButtonClick = this.handleYesButtonClick.bind(this)
    this.handleNoButtonClick = this.handleNoButtonClick.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
  }

  getEventDetails () {
    fetch(`${config.url}api/event/${this.props.match.params.id}`)
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
      this.setState({showPopUp: false})
    }
    // pop up to sign in
    this.saveAttendee(profile.getEmail(), this.state.event.id)
  }

  saveAttendee (email, eventId) {
    fetch(`${config.url}api/event/attendee`, {
      body: JSON.stringify({email, eventId}),
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        this.getEventDetails()
      }
    })
  }

  handleNoButtonClick () {
    console.log('no')
  }

  handleCloseClick () {
    this.setState({showPopUp: false})
    console.log('close')
  }

  render () {
    const {event, showPopUp} = this.state
    const {onLoginSuccess} = this.props
    const isUserAttending = event && this.props.profile && event.attendees && event.attendees.filter((attendee) =>
      attendee.email === this.props.profile.getEmail()
    )
    return (
      <main className='event-details'>
        {showPopUp && <PopUp onClose={this.handleCloseClick}><GoogleOauth onLoginSuccess={onLoginSuccess} /></PopUp>}
        <div className='event-details__header-wrapper'>
          <section className='event-details__header'>
            <article className='event-details__heading'>
              <DateTimeShort date={event.dateTime} />
              <Title {...event} />
            </article>
            {!isUserAttending &&
            <article className='event-details__user'>
              <div className='event-details__title'>Are you attending the event</div>
              <div className='event-details__button'>
                <Button label='Yes' onClick={this.handleYesButtonClick} />
                <Button label='No' onClick={this.handleNoButtonClick} />
              </div>
            </article>
            }
          </section>
        </div>
        <section className='event-details__content'>
          <article className='event-details__container'>
            <Description description={event.description} />
            {event.attendees && <Attendees attendees={event.attendees} />}
            {event.comments && <Comments comments={event.comments} />}
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
