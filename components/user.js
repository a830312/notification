import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { get as _get } from 'lodash'


export default class User extends Component {
  render() {
    let { user, title } = this.props,
        username = _get(user, 'username')

    return username ? (
      <div className="card form-group">
        <div className="card-body">
          <div className="card-text">
            { title ? <h4 className="card-title">{ title }</h4> : false }

            {
              Object.keys(user).map((data, i) => (
                <div key={ `${data}-${i}` }>
                  <dt>{ data }</dt>
                  <dd>{ _get(user, data, '') }</dd>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    ) : false
  }
}

User.propTypes = {
  user: PropTypes.object,
  title: PropTypes.string
}

User.defaultProps = {
  user: {},
  title: ''
}
