function login (req, res) {
  const {userid, password} = req.body
  const user = 'archanabansal'
  const pwd = 'archana'
  if (userid === user && password === pwd) {
    res.sendStatus(200)
  } else {
    res.sendStatus(401)
  }
}

module.exports = login
