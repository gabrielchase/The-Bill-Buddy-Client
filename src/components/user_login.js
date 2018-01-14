import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { loginUser } from '../actions'


class UserLogin extends Component {
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
        errors.email = 'Enter an email'
    }

    if (!values.password) {
        errors.password = 'Enter a password'
    }

    return errors
}

export default reduxForm({
    validate,
    form: 'UserLoginForm'
})(
    connect(null, { loginUser })(UserLogin)
)
