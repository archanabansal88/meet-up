const Login = require('./handler/login')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')

const app = express()
const PORT = 8000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'abc'
}))

app.post('/login', Login)

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})
