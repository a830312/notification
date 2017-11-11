import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isFunction as _isFunction } from 'lodash'


export default class Form extends Component {

  constructor(props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
  }

  _onSubmit(e) {
    e.preventDefault()
    let { onFormSubmit } = this.props

    if (_isFunction(onFormSubmit))
      onFormSubmit()

  }

  _onInputChange(e) {
    e.preventDefault()
    let { name, value } = e.target,
      { onInputChange } = this.props

    if (_isFunction(onInputChange))
      onInputChange({
        name: name,
        value: value
      })
  }

  render() {
    let { formName, inputs, action, method, submit } = this.props

    return (
      <form action={action} method={method} onSubmit={ this._onSubmit } name={formName} >
        {
          inputs.map((input, i) => (
            <div className="form-group" key={`${input.name}-${i}`}>
              { input.label ? <label>{ input.label }</label> : false }
              <input type={ input.type } className="form-control" name={ input.name } 
                onChange={this._onInputChange} />
            </div>
          ))
        }

        <button type="submit" className="btn btn-warning btn-lg">{ submit }</button>
      </form>
    )
  }
}

Form.propTypes = {
  inputs: PropTypes.array,
  action: PropTypes.string,
  method: PropTypes.string,
  submit: PropTypes.string,
  formName: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
}

Form.defaultProps = {
  inputs: [],
  action: '/signup',
  method: 'post',
  submit: 'submit'
}