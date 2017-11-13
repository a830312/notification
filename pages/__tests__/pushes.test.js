import React from 'react'
import renderer from 'react-test-renderer'
import { Pushes } from '../pushes'


describe('Pushes', () => {


    it('should render with correct title', () => {
      const component = renderer.create(<Pushes title="Signup / Login" />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should render without login / registeration form', () => {
      const component = renderer.create(<Pushes title="Signup / Login" />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should show the form for push notification after login', () => {
      const currentUser = { username: 'abc', accessToken: '123' }
      const component = renderer.create(<Pushes title="Register" currentUser={currentUser} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  
})

