const util = require('./utils')

const attendee = {
  saveAttendee: (req, res) => {
    let event, index
    util.getEvent(req.body.eventId).then(({selectedEvent, selectedIndex}) => {
      event = selectedEvent
      index = selectedIndex
      return req.body.profile
    }).then((userInfo) => {
      const attendee = event.attendees.filter(attendee => attendee.email === userInfo.email)[0]
      if (attendee) {
        return
      }
      event.attendees.push(userInfo)
      return util.addEventToIndex(index, event)
    }).then(() => {
      res.end()
    }).catch(() => {
      res.status(500).send()
    })
  },

  deleteAttendee: (req, res) => {
    util.getEvent(req.body.eventId).then(({selectedEvent, selectedIndex}) => {
      selectedEvent.attendees = selectedEvent.attendees.filter((attendee) => attendee.email !== req.body.profile.email)
      return util.addEventToIndex(selectedIndex, selectedEvent)
    }).then(() => {
      res.end()
    }).catch(() => {
      res.status(500).send()
    })
  }
}

module.exports = attendee
