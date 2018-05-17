function login (req, res) {
  const {emailid} = req.body
  const email = 'archanamittal0388@gmail.com'
  if (emailid === email) {
    req.session.email = emailid
    res.status(200).send('User Authentified')
  } else {
    req.session.email = false
    res.status(401).send('Invalid User')
  }
}

module.exports = login
