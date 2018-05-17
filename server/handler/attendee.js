const Util = require('./utils')

class Attendee {
  saveAttendee (req, res) {
    let event, index
    Util.getEvent(req.body.eventId).then(({selectedEvent, selectedIndex}) => {
      event = selectedEvent
      index = selectedIndex
      return Util.getUserProfile(req.body.email)
    }).then((userInfo) => {
      if (!event.attendees) {
        event.attendees = []
      }
      const attendee = event.attendees.filter((attendee) => attendee.email === req.body.email)[0]
      if (attendee) {
        return
      }
      event.attendees.push(userInfo)
      return Util.addEventToIndex(index, event)
    }).then(() => {
      res.end()
    }).catch(() => {
      res.status(500).send()
    })
  }

  deleteAttendee (req, res) {
    Util.getEvent(req.body.eventId).then(({selectedEvent, selectedIndex}) => {
      selectedEvent.attendees = selectedEvent.attendees.filter((attendee) => attendee.email !== req.body.email)
      return Util.addEventToIndex(selectedIndex, selectedEvent)
    }).then(() => {
      res.end()
    }).catch(() => {
      res.status(500).send()
    })
  }
}

module.exports = new Attendee()
