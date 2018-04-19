function login (req, res) {
  const {emailid} = req.body
  const email = 'archanamittal0388@gmail.com'
  if (emailid === email) {
    console.log('set the req session')
    req.session.email = emailid
    req.session.save(() => {
      res.status(200).send('User Authentified')
    })
    console.log('set the req session', req.session)
  } else {
    res.status(401).send('Invalid User')
  }
}

module.exports = login
