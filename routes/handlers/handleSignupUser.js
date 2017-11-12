import { extraceUserData } from '../../lib'

const handleSignupUser = (req, res) => {

  let { user } = req,
      data = extraceUserData(user)
  console.log(req.session)
  res.json(data)
}

export default handleSignupUser