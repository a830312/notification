import React from 'react'
import renderer from 'react-test-renderer'
import { Signup } from '../index'


describe('Signup', () => {


    it('should render with correct title', () => {
      const component = renderer.create(<Signup title="Register" />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should render with login / registeration form', () => {
      const component = renderer.create(<Signup title="Register" currentUser={{}} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('should hide the form after login', () => {
      const currentUser = { username: 'abc', accessToken: '123' }
      const component = renderer.create(<Signup title="Register" currentUser={currentUser} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  
})

