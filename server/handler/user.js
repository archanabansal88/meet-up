const util = require('./utils')

const user = {
  login: (req, res) => {
    util.saveUserInfo(req.body).then(() => {
      res.status(200).send('success')
    })
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.end()
    })
  },

  getUserInfo: (req, res) => {
    const admin = 'archanamittal0388@gmail.com'
    if (admin === req.body.email) {
      req.session.admin = req.body.email
    } else {
      req.session.user = req.body.email
      req.session.admin = ''
    }
    const email = req.body.email
    util.getUserProfile(email).then((obj) => {
      res.json(JSON.parse(obj))
    })
  }
}

module.exports = user
