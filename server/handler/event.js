const uuid = require('uuid/v1')
const util = require('./utils')

const event = {
  create: (req, res) => {
    const obj = Object.assign({}, req.body, {id: uuid(), attendees: [], comments: []})
    util.createEvent(obj).then(() => {
      res.end()
    })
  },
  eventList: (req, res) => {
    util.getAllEvent().then((events) => {
      const obj = events.map((event) => {
        return JSON.parse(event)
      })
      res.json(obj)
    })
  },
  eventDetails: (req, res) => {
    util.getAllEvent().then((events) => {
      const obj = events.filter((event) => {
        const eventObj = JSON.parse(event)
        return eventObj.id === req.params.id
      }).map((value) => JSON.parse(value))
      res.json(obj)
    })
  }
}

module.exports = event
