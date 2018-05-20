const util = require('./utils')

const comment = {
  saveComment: (req, res) => {
    let event, index
    util.getEvent(req.body.eventId).then(({selectedEvent, selectedIndex}) => {
      event = selectedEvent
      index = selectedIndex
      return util.getUserProfile(req.body.email)
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
      return util.addEventToIndex(index, event)
    }).then(() => {
      res.end()
    }).catch(() => {
      res.status(500).send()
    })
  }
}

module.exports = comment
