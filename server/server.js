const express = require('express')
const bodyParser = require('body-parser')
// const session = require('express-session')
const path = require('path')
const admin = require('./handler/admin')
const user = require('./handler/user')
const event = require('./handler/event')
const attendee = require('./handler/attendee')
const comment = require('./handler/comment')

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('build'))

// API call for admin login
app.post('/api/admin/login', admin)

// API call to get list of events
app.get('/api/event', event.eventList)

//  API call to get details of a particular event
app.get('/api/event/:id', event.eventDetails)

//  API call to save an attendee for a particular event
app.post('/api/event/attendee', attendee.saveAttendee)

//  API call to remove an attendee for a particular event
app.post('/api/event/attendee/cancel', attendee.deleteAttendee)

//  API call to save a comment for a particular event
app.post('/api/event/comment', comment.saveComment)

//  API call to delete a comment for a particular event
app.delete('/api/event/comment', comment.deleteComment)

// API call to create an event
app.post('/api/event/create', event.create)

app.get('/create', (req, res, next) => {
  // if (!req.session.email) {
  //   res.redirect('/')
  // } else {
  next()
  // }
})

// API call for user details
app.post('/api/user/get', user.getUserInfo)

// API call for user login
app.post('/api/user/login', user.login)

// API call for user logout
app.get('/logout', user.logout)

// to render UI...always place it at the bottom
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`))
})

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit() })
