const Login = require('./handler/login')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')

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

app.post('/login', Login)

app.get('/create', (req, res, next) => {
  if (!req.session.email) {
    res.setHeader('content-type', 'text/html')
    res.redirect('/')
  }
  next()
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../build/index.html`))
})

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})
