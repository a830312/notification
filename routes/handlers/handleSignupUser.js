import { extraceUserData } from '../../lib'

const handleSignupUser = (req, res) => {

  let { user } = req,
      data = extraceUserData(user)
  res.json(data)
}

export default handleSignupUser