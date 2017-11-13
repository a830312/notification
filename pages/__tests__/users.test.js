import React from 'react'
import renderer from 'react-test-renderer'
import { Users } from '../users'


describe('Users Component', () => {


    it('should render with correct title', () => {
      const component = renderer.create(<Users title="List users" />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should render hint if no user registered yet', () => {
      const component = renderer.create(<Users title="List users" />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should list users', () => {
      const users = [
        { username: 'foo', accessToken: '123' },
        { username: 'bar', accessToken: '456' }
      ]
      const component = renderer.create(<Users title="List users" users={users} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  
})

