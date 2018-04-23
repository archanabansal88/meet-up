import React from 'react'
import data from '../../../data/sample'
import {DateTimeShort} from '../dateThumbnail'
import Title from '../eventTitle/title'
import Description from '../eventDescription/description'
import Attendees from '../eventAttendees/attendees'
import Comment from '../eventComments/comments'
import './style.css'

const EventDetails = () => {
  return (
    <main className='event-details'>
      <section className='event-details__header'>
        <DateTimeShort date={data.dateTime} />
        <Title {...data} />
      </section>
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

export default EventDetails
