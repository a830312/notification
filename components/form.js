import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isFunction as _isFunction, get as _get } from 'lodash'


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
    let { inputs, action, method, submit, form } = this.props,
        inputsArry = Object.keys(inputs || {}) || []

    return (
      <form action={action} method={method} onSubmit={ this._onSubmit } >
        {
          inputsArry.map((input, i) => {
            let field = _get(inputs, input, {})
            return (
              <div className="form-group" key={`${field.name}-${input}`}>
                { field.label ? <label>{ field.label }</label> : false }
                <input type={ field.type } className="form-control" name={ field.name } 
                  onChange={this._onInputChange} value={ _get(form, input, '') }/>
              </div>
            )
          })
        }

        <button type="submit" className="btn btn-warning btn-lg">{ submit }</button>
      </form>
    )
  }
}

Form.propTypes = {
  inputs: PropTypes.object,
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
  submit: 'submit',
  onFormSubmit: () => {},
  onInputChange: () => {}
}