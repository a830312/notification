import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import navigationConfig from '../config/navigation'

export default class Navigation extends Component {
  render() {
    let { navigation } = this.props

    return (
      <p>
        {
          navigation.map((navi, i) => (
            <Link key={`navi-${i}`} href={navi.link} as={navi.link}><a className="card-link">{navi.text}</a></Link>
          ))
        }
      </p>
    )
  }
}

Navigation.propTypes = {
  navigation: PropTypes.array
}

Navigation.defaultProps = {
  navigation: navigationConfig
}