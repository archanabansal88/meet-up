const Util = require('./utils')

class Comment {
  saveComment (req, res) {
    let event, index
    Util.getEvent(req.body.eventId).then(({selectedEvent, selectedIndex}) => {
      event = selectedEvent
      index = selectedIndex
      return Util.getUserProfile(req.body.email)
    }).then((userInfo) => {
      if (!event.comments) {
        event.comments = []
      }
      const obj = {
        message: req.body.message,
        dateTime: Date.now(),
        ...userInfo
      }
      event.comments.unshift(obj)
      return Util.addEventToIndex(index, event)
    }).then(() => {
      res.end()
    }).catch(() => {
      res.status(500).send()
    })
  }
}

module.exports = new Comment()
