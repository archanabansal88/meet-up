const userModel = require('../model/user')

const userController = {
  login: (req, res) => {
    userModel.saveUserInfo(req.body).then(() => {
      res.status(200).send('success')
    })
  },

  logout: (req, res) => {
    req.session.destroy()
    res.clearCookie()
    res.redirect('/')
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
    userModel.getUserProfile(email).then((obj) => {
      res.json(JSON.parse(obj))
    })
  }
}

module.exports = userController
