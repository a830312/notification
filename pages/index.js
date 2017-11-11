import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Head from '../components/head'
import Form from '../components/form'
import User from '../components/user'
import Message from '../components/message'
import signupconfigs from '../config/signup'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signup, handleSignupFormSubmit, handleSignupInputChange } from '../actions'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../reducers'
import Link from 'next/link'

class Signup extends Component {
  render() {
    let { message, hasSignup, currentUser, ...others } = this.props

    return (
      <div>
        <Head title="Notification - Signup" />
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">

              <h1><span className="fa fa-sign-in"></span>Signup</h1>

              <Message message={message} />

              { !hasSignup ? <Form { ...signupconfigs.form } {...others} /> : false }

              { 
                currentUser.username ? (
                  <div>
                    <User user={currentUser} />
                    <Link href='/pushes' as='/pushes'><a>Send Notification</a></Link>
                  </div>
                ) : false
              }

          </div>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  message: PropTypes.string
}

const mapStateToProps = ({ message, hasSignup, currentUser }) => {
  return {
    message,
    hasSignup,
    currentUser
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
