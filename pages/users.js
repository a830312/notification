import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../reducers'
import { getUserList } from '../actions'
import User from '../components/user'
import Message from '../components/message'
import Head from '../components/head'
import Navigation from '../components/navigation'


class Users extends Component {

  static getInitialProps ({ store, isServer }) {
    store.dispatch(getUserList(isServer))

    return { isServer }
  }

  render() {
    let { users, message, title } = this.props
    return (
      <div>
        <Head title={`Notification - ${title}`} />
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">

              <h1>{ title }</h1>
              <Navigation />
              <Message message={ message } />

              {
                users.length ? (
                  (users || []).map((user, i) => 
                    <User user={user} key={`user-list-${i}`} />
                  )
                ) : <p>No users registered yet</p>
              }

          </div>
        </div>
      </div>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array,
  message: PropTypes.string,
  title: PropTypes.string
}

Users.defaultProps = {
  title: 'List users'
}

const mapStateToProps = ({ users, message }) => {
  return {
    users,
    message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export { Users }
export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Users)

