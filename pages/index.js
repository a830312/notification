import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from '../components/head'
import Form from '../components/form'
import User from '../components/user'
import Message from '../components/message'
import Navigation from '../components/navigation'
import signupconfigs from '../config/signup'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signup, handleSignupFormSubmit, handleSignupInputChange } from '../actions'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../reducers'
import Link from 'next/link'
import { get as _get } from 'lodash'

class Signup extends Component {

  render() {
    let { title, message, currentUser, formConfigs, signupForm, ...others } = this.props,
      { username } = currentUser

    return (
      <div>
        <Head title={`Notification - ${title}`} />
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">

              <h1>{ title }</h1>
              <Navigation />

              <Message message={ message } />
              <User title="Current User" user={ currentUser } />
              <Form form={signupForm} { ...formConfigs } {...others} />

          </div>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  message: PropTypes.string,
  formConfigs: PropTypes.object,
  currentUser: PropTypes.object,
  hasSignup: PropTypes.bool,
  title: PropTypes.string,
  signupForm: PropTypes.object
}

Signup.defaultProps = {
  formConfigs: signupconfigs.form,
  title: 'Signup'
}

const mapStateToProps = ({ message, hasSignup, currentUser, signupForm }) => {
  return {
    message,
    hasSignup,
    currentUser,
    signupForm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: bindActionCreators(signup, dispatch),
    onFormSubmit: bindActionCreators(handleSignupFormSubmit, dispatch),
    onInputChange: bindActionCreators(handleSignupInputChange, dispatch)
  }
}

export { Signup }
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Signup)
