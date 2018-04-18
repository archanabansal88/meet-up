const Login = require('./handler/login')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 8000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/login', Login)

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})
