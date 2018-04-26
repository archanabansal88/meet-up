const Login = require('./handler/login')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const redis = require('redis')
const uuid = require('uuid/v1')
const client = redis.createClient()
const {promisify} = require('util')
const app = express()
const PORT = 3000

client.on('connect', function () {
  console.log('connected')
})

const clientHmset = promisify(client.hmset).bind(client)
const clientHgetall = promisify(client.hgetall).bind(client)
const clientLpush = promisify(client.lpush).bind(client)
const clientLrange = promisify(client.lrange).bind(client)
const clientLset = promisify(client.lset).bind(client)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'abc'
}))

app.post('/api/login', Login)

app.get('/api/event', (req, res) => {
  clientLrange('events', 0, -1).then((events) => {
    const obj = events.map((event) => {
      return JSON.parse(event)
    })
    res.json(obj)
  })
})

app.get('/api/event/:id', (req, res) => {
  clientLrange('events', 0, -1).then((events) => {
    const obj = events.filter((event) => {
      const eventObj = JSON.parse(event)
      return eventObj.id === req.params.id
    }).map((value) => JSON.parse(value))
    res.json(obj)
  })
})

app.post('/api/event/attendee', (req, res) => {
  let selectedIndex = -1
  let selectedEvent
  clientLrange('events', 0, -1).then((events) => {
    events.forEach((event, index) => {
      const eventObj = JSON.parse(event)
      if (eventObj.id === req.body.eventId) {
        selectedEvent = eventObj
        selectedIndex = index
      }
    })
    return clientHgetall(req.body.email)
  }).then((obj) => {
    if (!selectedEvent.attendees) {
      selectedEvent.attendees = []
    }
    selectedEvent.attendees.push(obj)
    return clientLset('events', selectedIndex, JSON.stringify(selectedEvent))
  }).then(() => {
    res.end()
  }).catch(() => {
    res.status(500).send()
  })
})

app.post('/api/event/create', (req, res) => {
  const obj = Object.assign({}, req.body, {id: uuid()})
  clientLpush('events', JSON.stringify(obj)).then(() => {
    res.end()
  })
})

app.get('/create', (req, res, next) => {
  if (!req.session.email) {
    res.redirect('/')
  } else {
    next()
  }
})

app.post('/api/user/get', (req, res) => {
  const { email } = req.body
  clientHgetall(email).then((obj) => {
    res.json(obj)
  })
})

app.post('/api/user/login', (req, res) => {
  const {email, name, id, image} = req.body
  clientHmset(email, {
    name, id, email, image
  }).then(() => {
    res.status(200).send('success')
  })
})

// to render UI...always place it at the bottom
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`))
})

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})
