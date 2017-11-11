import Head from 'next/head'
import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class NotificationHead extends Component {
  render() {
    let { title } = this.props

    return (
      <Head>
        <title>{ title }</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css" />
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" />
      </Head>
    )
  }
}

NotificationHead.propTypes = {
  title: PropTypes.string
}

NotificationHead.defaultProps = {
  title: 'Notification'
}