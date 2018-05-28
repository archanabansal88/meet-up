const util = require('./utils')
const uuid = require('uuid/v1')

const comment = {
  saveComment: (req, res) => {
    let event, index
    util.getEvent(req.body.eventId).then(({selectedEvent, selectedIndex}) => {
      event = selectedEvent
      index = selectedIndex
      return util.getUserProfile(req.body.email)
    }).then((userInfo) => {
      userInfo = JSON.parse(userInfo)
      const obj = {
        message: req.body.message,
        dateTime: Date.now(),
        commentId: uuid(),
        ...userInfo
      }
      event.comments.unshift(obj)
      return util.addEventToIndex(index, event)
    }).then(() => {
      res.end()
    }).catch(() => {
      res.status(500).send()
    })
  },
  deleteComment: (req, res) => {
    util.getEvent(req.body.eventId).then(({selectedEvent, selectedIndex}) => {
      selectedEvent.comments = selectedEvent.comments.filter((comment) => comment.commentId !== req.body.commentId)
      return util.addEventToIndex(selectedIndex, selectedEvent)
    }).then(() => {
      res.end()
    }).catch(() => {
      res.status(500).send()
    })
  }
}

module.exports = comment
