import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { loginUser, addMessage } from '../actions'

import { callAPI } from '../utils'


class UserLogin extends Component {
    async componentWillMount() {
        await callAPI()
    }

    renderField(field) {
        return (
            <div>
                <label htmlFor="">{field.label}</label>
                <input type={field.type}
                    { ...field.input }
                />
                {field.meta.touched ? field.meta.error : ''}
            </div>
        )
    }

    async onSubmit(values) {
        await this.props.loginUser(values)
        await this.props.addMessage('Login successful')
        await this.props.history.push('/dashboard')
    }

    render() {
        const { handleSubmit} = this.props
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h1>User Login</h1>
                <Field 
                    name="email"
                    label="Email"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    name="password"
                    label="Password"
                    type="password"
                    component={this.renderField}
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

function validate(values) {
    let errors = {}

    if (!values.email) {
        errors.email = <p className="form-errors">Enter an email</p>
    }

    if (!values.password) {
        errors.password = <p className="form-errors">Enter a password</p>
    }

    return errors
}

export default reduxForm({
    validate,
    form: 'UserLoginForm'
})(
    connect(null, { loginUser, addMessage })(UserLogin)
)
