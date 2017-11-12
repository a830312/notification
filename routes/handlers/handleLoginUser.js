const handleLoginUser = (req, res) => {

  let { user } = req
  req.logIn(user, function(err) {
    if (err) {
      req.logout()
      res.json(req.session.messages)
    }
    res.json(req.user)
  })
}

export default handleLoginUser