const Util = require('./utils')

class User {
  login (req, res) {
    req.session.email = req.body.email
    Util.saveUserInfo(req.body).then(() => {
      res.status(200).send('success')
    })
  }

  logout (req, res) {
    req.session.destroy()
    res.clearCookie()
    res.redirect('/')
  }

  getUserInfo (req, res) {
    const { email } = req.body
    Util.getUserProfile(email).then((obj) => {
      res.json(obj)
    })
  }
}

module.exports = new User()
