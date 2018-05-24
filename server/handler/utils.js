const Redis = require('../redis')

const util = {
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

  getUserProfile: (store, email) => {
    return Redis.hget(store, email)
  },

  createEvent: (obj) => {
    return Redis.lpush('events', JSON.stringify(obj))
  },

  getAllEvent: () => {
    return Redis.lrange('events', 0, -1)
  },

  saveUserInfo: (store, {email, name, id, image, aboutme, display}) => {
    return Redis.hmset(store, email, JSON.stringify({email, name, id, image, aboutme, display}))
  }
}

module.exports = util
