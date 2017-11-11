import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class User extends Component {
  render() {
    let { user } = this.props

    return user.username ? (
      <div>
        <p>current user:</p>
        <ul>
          {
            Object.keys(user).map((data, i) => <li key={`${data}-${i}`}>{`${data}: ${user[data]}`}</li>)
          }
        </ul>
      </div>
    ) : false
  }
}

User.propTypes = {
  user: PropTypes.object
}

User.defaultProps = {
  user: {}
}
