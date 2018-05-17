const redis = require('redis')
const client = redis.createClient()
const {promisify} = require('util')

client.on('connect', function () {
  console.log('connected')
})

const hmset = promisify(client.hmset).bind(client)
const hgetall = promisify(client.hgetall).bind(client)
const lpush = promisify(client.lpush).bind(client)
const lrange = promisify(client.lrange).bind(client)
const lset = promisify(client.lset).bind(client)

module.exports = {
  hmset, hgetall, lpush, lrange, lset
}
