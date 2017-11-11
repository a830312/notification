import React, { Component } from 'react'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../reducers'

class Notification extends Component {
  render() {
    return (
      <ul>
        <li><Link href='/signup' as='/signup'><a>Signup</a></Link></li>
      </ul>
    )
  }
}

export default withRedux(initStore, null, null)(Notification)

