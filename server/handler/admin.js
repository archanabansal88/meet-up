function login (req, res) {
  const {email} = req.body
  const admin = 'archanamittal0388@gmail.com'
  if (email === admin) {
    req.session.admin = email
    res.status(200).send('User Authentified')
  } else {
    req.session.email = false
    res.status(401).send('Invalid User')
  }
}

module.exports = login
