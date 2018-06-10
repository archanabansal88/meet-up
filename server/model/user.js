const Redis = require('../redis')

const userModel = {
  getUserProfile: (email) => {
    return Redis.hget('users', email)
  },
  saveUserInfo: ({ email, name, id, image, aboutme, display }) => {
    return Redis.hmset(
      'users',
      email,
      JSON.stringify({ email, name, id, image, aboutme, display })
    )
  }
}

module.exports = userModel
