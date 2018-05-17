const uuid = require('uuid/v1')
const Util = require('./utils')

class Event {
  create (req, res) {
    const obj = Object.assign({}, req.body, {id: uuid()})
    Util.createEvent(obj).then(() => {
      res.end()
    })
  }
  eventList (req, res) {
    Util.getAllEvent().then((events) => {
      const obj = events.map((event) => {
        return JSON.parse(event)
      })
      res.json(obj)
    })
  }
  eventDetails (req, res) {
    Util.getAllEvent().then((events) => {
      const obj = events.filter((event) => {
        const eventObj = JSON.parse(event)
        return eventObj.id === req.params.id
      }).map((value) => JSON.parse(value))
      res.json(obj)
    })
  }
}

module.exports = new Event()
