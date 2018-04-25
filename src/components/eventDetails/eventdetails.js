import React from 'react'
import data from '../../../data/sample'
import {DateTimeShort} from '../dateThumbnail'
import Title from '../eventTitle/title'
import Description from '../eventDescription/description'
import Attendees from '../eventAttendees/attendees'
import Comment from '../eventComments/comments'
import Button from '../../shared/button'
import './style.css'

class EventDetails extends React.Component {
  constructor (props) {
    super(props)
    this.handleYesButtonClick = this.handleYesButtonClick.bind(this)
    this.handleNoButtonClick = this.handleNoButtonClick.bind(this)
  }

  handleYesButtonClick () {
    console.log('yes')
  }

  handleNoButtonClick () {
    console.log('no')
  }

  render () {
    return (
      <main className='event-details'>
        <div className='event-details__header-wrapper'>
          <section className='event-details__header'>
            <article className='event-details__heading'>
              <DateTimeShort date={data.dateTime} />
              <Title {...data} />
            </article>
            <article className='event-details__user'>
              <div className='event-details__title'>Are you attending the event</div>
              <div className='event-button__container'>
                <Button label='Yes' onClick={this.handleYesButtonClick} className='yes__button' />
                <Button label='No' onClick={this.handleNoButtonClick} className='no__button' />
              </div>
            </article>
          </section>
        </div>
        <section className='event-details__content'>
          <article className='event-details__container'>
            <Description description={data.description} />
            {data.attendees && <Attendees attendees={data.attendees} />}
            {data.comments && <Comment comments={data.comments} />}
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
