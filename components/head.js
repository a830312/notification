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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossOrigin="anonymous"/>
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