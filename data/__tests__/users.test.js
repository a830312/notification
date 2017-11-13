import users from '../users'
const username = 'bbcUser1'
const accesstoken = 'o.fq6zRoK99CCKOlQ4fRWaqEN9LpKdtJBS'

describe('addUser', () => {

    it('add user to records and execute callback', () => {
      let cb = (err, userData) => {

        expect(userData).toHaveProperty('id')
        expect(userData).toHaveProperty('username', username)
        expect(userData).toHaveProperty('accessToken', accesstoken)
        expect(userData).toHaveProperty('creationTime')
        expect(userData).toHaveProperty('numOfNotificationsPushed', 0)

      }

      users.addUser({
        username: username,
        accesstoken: accesstoken
      }, cb)
      
    })
  
})

describe('findById', () => {

    it('returns match user data with given id', () => {
      let cb = (err, userData) => {

        expect(userData).toHaveProperty('id', 0)
        expect(userData).toHaveProperty('username')
        expect(userData).toHaveProperty('accessToken')
        expect(userData).toHaveProperty('creationTime')
        expect(userData).toHaveProperty('numOfNotificationsPushed')

      }

      users.findById(0, cb)
      
    })
  
})

describe('findByUsername', () => {

    it('returns match user data with given username', () => {
      let cb = (err, userData) => {

        expect(userData).toHaveProperty('id')
        expect(userData).toHaveProperty('username', username)
        expect(userData).toHaveProperty('accessToken')
        expect(userData).toHaveProperty('creationTime')
        expect(userData).toHaveProperty('numOfNotificationsPushed')

      }

      users.findByUsername(username, cb)
      
    })
})

describe('updateUser', () => {

    it('imcrement the numOfNotificationsPushed of user by 1 and returns new userData', () => {
      let cb = (err, userData) => {

        expect(userData).toHaveProperty('id')
        expect(userData).toHaveProperty('username', username)
        expect(userData).toHaveProperty('accessToken')
        expect(userData).toHaveProperty('creationTime')
        expect(userData).toHaveProperty('numOfNotificationsPushed', 1)

      }

      users.updateUser(username, cb)
      
    })
  
})

describe('getUsers', () => {

    it('returns all the registered users', () => {
      let cb = (userData) => {

        let eachUser = userData[0]
        expect(userData).toHaveLength(1)
        expect(eachUser).toHaveProperty('id')
        expect(eachUser).toHaveProperty('username')
        expect(eachUser).toHaveProperty('accessToken')
        expect(eachUser).toHaveProperty('creationTime')
        expect(eachUser).toHaveProperty('numOfNotificationsPushed')

      }
      users.getUsers(cb)
      
      
    })
  
})