import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isFunction as _isFunction } from 'lodash'
import withRedux from 'next-redux-wrapper'
import Head from '../components/head'
import Form from '../components/form'
import User from '../components/user'
import Message from '../components/message'
import Navigation from '../components/navigation'
import pushesConfigs from '../config/pushes'
import { initStore } from '../reducers'
import { handleNotificationFormSubmit, handlePushesInputChange } from '../actions'
import { bindActionCreators } from 'redux'
import { get as _get } from 'lodash'
import Link from 'next/link'



class Pushes extends React.Component {

  render() {
    let { currentUser, message, hasSignup, title, formConfigs, notificationForm, ...others } = this.props,
        { username } = currentUser

    return (
      <div>
        <Head title={`Notification - ${title}`} />
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3 mx-auto">

              <h1>{ title }</h1>
              <Navigation />

              <Message message={message} /> 

              <User title="Current User" user={currentUser} />
                    

              { username ? <Form form={notificationForm} { ...formConfigs } {...others} /> : 
                <p>Please <Link href="/" as="/"><a>signup</a></Link> first</p> }

          </div>
        </div>
      </div>
    )
  }
}

Pushes.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  currentUser: PropTypes.object,
  hasSignup: PropTypes.bool,
  onInputChange: PropTypes.func,
  onFormSubmit: PropTypes.func,
  formConfigs: PropTypes.object,
  notificationForm: PropTypes.object
}

Pushes.defaultProps = {
  title: 'Push Notification',
  formConfigs: pushesConfigs.form
}

const mapStateToProps = ({ message, hasSignup, currentUser, notificationForm }) => {
  return {
    message,
    hasSignup,
    currentUser,
    notificationForm
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


