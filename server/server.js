const Login = require('./handler/login')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const fs = require('fs')
const redis = require('redis')
const client = redis.createClient()
const app = express()
const PORT = 3000

client.on('connect', function () {
  console.log('connected')
})

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
  fs.readFile(path.resolve(`${__dirname}/data/data.json`), (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send('Not able to read file')
    }
    res.json(JSON.parse(data))
  })
})

app.post('/api/event/create', (req, res) => {
  fs.readFile(path.resolve(`${__dirname}/data/data.json`), (err, data) => {
    if (err) {
      res.status(500).send('Not able to read file')
    }
    const obj = data ? JSON.parse(data) : []
    obj.push(req.body)
    const updatedData = JSON.stringify(obj, null, 2)
    fs.writeFile(path.resolve(`${__dirname}/data/data.json`), updatedData, err => {
      if (err) {
        res.status(500).send('Not able to save file')
      }
      res.end()
    })
  })
})

app.get('/create', (req, res, next) => {
  if (!req.session.email) {
    res.setHeader('content-type', 'text/html')
    res.redirect('/')
  } else {
    next()
  }
})

// TODO: Save user info in redis
app.post('/api/user/login', (req, res) => {

})

// to render UI...always place it at the bottom
app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../build/index.html`))
})

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})
