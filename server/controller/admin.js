const adminController = {
  authorize: (req, res, next) => {
    if (req.session.admin) {
      res.redirect('/admin/dashboard')
    } else {
      next()
    }
  },
  authenticate: (req, res, next) => {
    if (!req.session.admin) {
      res.redirect('/')
    } else {
      next()
    }
  }
}

module.exports = adminController
