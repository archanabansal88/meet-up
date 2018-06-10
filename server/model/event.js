const Redis = require('../redis')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../../build/images')
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '_' + file.originalname)
  }
})

const upload = multer({ storage })

const eventModel = {
  getEvent: (eventId) => {
    let selectedIndex = -1
    let selectedEvent
    return Redis.lrange('events', 0, -1).then((events) => {
      events.forEach((event, index) => {
        const eventObj = JSON.parse(event)
        if (eventObj.id === eventId) {
          selectedEvent = eventObj
          selectedIndex = index
        }
      })
      return {selectedEvent, selectedIndex}
    })
  },

  addEventToIndex: (index, event) => {
    return Redis.lset('events', index, JSON.stringify(event))
  },

  createEvent: (obj) => {
    return Redis.lpush('events', JSON.stringify(obj))
  },

  getAllEvent: () => {
    return Redis.lrange('events', 0, -1)
  },

  fileUpload: () => {
    return upload.single('file')
  }
}

module.exports = eventModel
