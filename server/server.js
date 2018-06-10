const express = require('express')
const bodyParser = require('body-parser')
const redis = require('redis')
const client = redis.createClient()
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const path = require('path')

const eventRoutes = require('./routes/event')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')

const app = express()
const PORT = 3000

app.use(session({
  secret: 'ssshhhhh',
  store: new RedisStore({host: 'localhost', port: 6379, client: client, ttl: 260}),
  saveUninitialized: false,
  resave: false
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('build'))

// Event routes
app.use('/api/event', eventRoutes)

//  User routes
app.use('/api/user', userRoutes)

// Admin routes
app.use('/admin', adminRoutes)

// to render UI...always place it at the bottom
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`))
})

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit() })
