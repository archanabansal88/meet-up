const uuid = require('uuid/v1')
const util = require('../model/utils')

const event = {
  create: (req, res) => {
    const data = Object.assign(req.file, {destination: '/images/', name: req.file.filename})
    const obj = Object.assign({}, req.body, {id: uuid(), image: data, attendees: [], comments: []})
    util.createEvent(obj).then(() => {
      res.json(obj)
    })
  },

  edit: (req, res) => {
    util.getEvent(req.body.id).then(({selectedEvent, selectedIndex}) => {
      let image = selectedEvent.image
      if (req.file) {
        image = Object.assign(req.file, {destination: '/images/', name: req.file.filename})
      }
      const event = Object.assign(selectedEvent, req.body, {image})
      return util.addEventToIndex(selectedIndex, event)
    }).then(() => {
      res.json({id: req.body.id})
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
