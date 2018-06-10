const express = require('express')
const router = express.Router()

const eventController = require('../controller/event')

// API call to get list of events
router.get('/', eventController.eventList)

// API call to create an event
router.post('/', eventController.upload, eventController.create)

// API call to edit an event
router.put('/', eventController.upload, eventController.edit)

//  API call to get details of a particular event
router.get('/:id', eventController.eventDetails)

//  API call to save an attendee for a particular event
router.post('/attendee', eventController.attendee.saveAttendee)

//  API call to remove an attendee for a particular event
router.post('/attendee/cancel', eventController.attendee.deleteAttendee)

//  API call to save a comment for a particular event
router.post('/comment', eventController.comment.saveComment)

//  API call to delete a comment for a particular event
router.delete('/comment', eventController.comment.deleteComment)

module.exports = router
