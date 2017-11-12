import { extraceUserData } from '../../lib'

const handleListUser = (req, res) => {
  let users = (req.users || []).map((user, i) => {
    let data = extraceUserData(user)
    return data
  })
  res.json(users)
}

export default handleListUser