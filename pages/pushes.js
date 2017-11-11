import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isFunction as _isFunction } from 'lodash'
import withRedux from 'next-redux-wrapper'
import Head from '../components/head'
import Form from '../components/form'
import User from '../components/user'
import Message from '../components/message'
import pushesConfigs from '../config/pushes'
import { initStore } from '../reducers'
import { handleNotificationFormSubmit, handlePushesInputChange } from '../actions'
import { bindActionCreators } from 'redux'



class Pushes extends React.Component {
  // static async getInitialProps({ req, res }) {
  //   if (!_isFunction(req.isAuthenticated) || !req.isAuthenticated())
  //     res.redirect('/')
  // }

  render() {
    let { currentUser, message, hasSignup, ...others } = this.props

    return (
      <div>
        <Head title="Notification - Push Notification" />
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">

              <h1><span className="fa fa-sign-in"></span>Push Notification</h1>

              <Message message={message} />

              <User user={currentUser} />

              <Form { ...pushesConfigs.form } {...others} />

          </div>
        </div>
      </div>
    )
  }
}

Pushes.propTypes = {
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
    onFormSubmit: bindActionCreators(handleNotificationFormSubmit, dispatch),
    onInputChange: bindActionCreators(handlePushesInputChange, dispatch)
  }
}

export { Pushes }
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Pushes)


