const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const AdminLogin = require('./handler/admin')
const User = require('./handler/user')
const Event = require('./handler/event')
const Attendee = require('./handler/attendee')
const Comment = require('./handler/comment')

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'abc'
}))

// API call for admin login
app.post('/api/admin/login', AdminLogin)

// API call to get list of events
app.get('/api/event', Event.eventList)

//  API call to get details of a particular event
app.get('/api/event/:id', Event.eventDetails)

//  API call to save an attendee for a particular event
app.post('/api/event/attendee', Attendee.saveAttendee)

//  API call to remove an attendee for a particular event
app.post('/api/event/attendee/cancel', Attendee.deleteAttendee)

//  API call to save a comment for a particular event
app.post('/api/event/comment', Comment.saveComment)

// API call to create an event
app.post('/api/event/create', Event.create)

app.get('/create', (req, res, next) => {
  if (!req.session.email) {
    res.redirect('/')
  } else {
    next()
  }
})

// API call for user details
app.post('/api/user/get', User.getUserInfo)

// API call for user login
app.post('/api/user/login', User.login)

// API call for user logout
app.get('/logout', User.logout)

// to render UI...always place it at the bottom
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`))
})

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit() })
