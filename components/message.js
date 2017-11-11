import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class Message extends Component {
  render() {
    let { message } = this.props

    return message ? <div className="alert alert-info">{ message }</div> : false
  }
}

Message.propTypes = {
  message: PropTypes.string
}

Message.defaultProps = {
  message: ''
}
