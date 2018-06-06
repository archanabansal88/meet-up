const util = require('./utils')

const user = {
  login: (req, res) => {
    util.saveUserInfo(req.body).then(() => {
      res.status(200).send('success')
    })
  },

  logout: (req, res) => {
    req.session.destroy()
    res.clearCookie()
    res.redirect('/')
  },

  getUserInfo: (req, res) => {
    req.session.user = req.body.email
    const email = req.body.email
    util.getUserProfile(email).then((obj) => {
      res.json(JSON.parse(obj))
    })
  }
}

module.exports = user
