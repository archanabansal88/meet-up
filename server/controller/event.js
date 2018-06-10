const uuid = require('uuid/v1')
const eventModel = require('../model/event')
const userModel = require('../model/user')

const eventController = {
  create: (req, res) => {
    const data = Object.assign(req.file, {destination: '/images/', name: req.file.filename})
    const obj = Object.assign({}, req.body, {id: uuid(), image: data, attendees: [], comments: []})
    eventModel.createEvent(obj).then(() => {
      res.json(obj)
    })
  },

  edit: (req, res) => {
    eventModel.getEvent(req.body.id).then(({selectedEvent, selectedIndex}) => {
      let image = selectedEvent.image
      if (req.file) {
        image = Object.assign(req.file, {destination: '/images/', name: req.file.filename})
      }
      const event = Object.assign(selectedEvent, req.body, {image})
      return eventModel.addEventToIndex(selectedIndex, event)
    }).then(() => {
      res.json({id: req.body.id})
    })
  },

  eventList: (req, res) => {
    console.log('called eventList')
    eventModel.getAllEvent().then((events) => {
      const obj = events.map((event) => {
        return JSON.parse(event)
      })
      res.json(obj)
    })
  },

  eventDetails: (req, res) => {
    eventModel.getAllEvent().then((events) => {
      const obj = events.filter((event) => {
        const eventObj = JSON.parse(event)
        return eventObj.id === req.params.id
      }).map((value) => JSON.parse(value))
      res.json(obj)
    })
  },

  attendee: {
    saveAttendee: (req, res) => {
      let event, index
      eventModel.getEvent(req.body.eventId).then(({selectedEvent, selectedIndex}) => {
        event = selectedEvent
        index = selectedIndex
        return req.body.profile
      }).then((userInfo) => {
        const attendee = event.attendees.filter(attendee => attendee.email === userInfo.email)[0]
        if (attendee) {
          return
        }
        event.attendees.push(userInfo)
        return eventModel.addEventToIndex(index, event)
      }).then(() => {
        res.end()
      }).catch(() => {
        res.status(500).send()
      })
    },
    deleteAttendee: (req, res) => {
      eventModel.getEvent(req.body.eventId).then(({selectedEvent, selectedIndex}) => {
        selectedEvent.attendees = selectedEvent.attendees.filter((attendee) => attendee.email !== req.body.profile.email)
        return eventModel.addEventToIndex(selectedIndex, selectedEvent)
      }).then(() => {
        res.end()
      }).catch(() => {
        res.status(500).send()
      })
    }
  },

  comment: {
    saveComment: (req, res) => {
      let event, index
      eventModel.getEvent(req.body.eventId).then(({selectedEvent, selectedIndex}) => {
        event = selectedEvent
        index = selectedIndex
        return userModel.getUserProfile(req.body.email)
      }).then((userInfo) => {
        userInfo = JSON.parse(userInfo)
        const obj = {
          message: req.body.message,
          dateTime: Date.now(),
          commentId: uuid(),
          ...userInfo
        }
        event.comments.unshift(obj)
        return eventModel.addEventToIndex(index, event)
      }).then(() => {
        res.end()
      }).catch(() => {
        res.status(500).send()
      })
    },
    deleteComment: (req, res) => {
      eventModel.getEvent(req.body.eventId).then(({selectedEvent, selectedIndex}) => {
        selectedEvent.comments = selectedEvent.comments.filter((comment) => comment.commentId !== req.body.commentId)
        return eventModel.addEventToIndex(selectedIndex, selectedEvent)
      }).then(() => {
        res.end()
      }).catch(() => {
        res.status(500).send()
      })
    }
  },
  upload: () => {
    eventModel.fileUpload()
  }
}

module.exports = eventController
