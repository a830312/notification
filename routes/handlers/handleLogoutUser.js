const handleLogoutUser = (req, res) => {

  req.logout()
  res.status(304).redirect('/')
}

export default handleLogoutUser