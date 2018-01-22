import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { createUser } from '../actions'


class UserCreate extends Component {
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
        if (values.password === values.confirm_password) {
            values.details = {
                country: values.country,
                mobile_number: values.mobile_number
            }
            delete values.confirm_password
            delete values.country
            delete values.mobile_number

            console.log(values)

            await this.props.createUser(values)
            await this.props.history.push('/login')
        } else {
            // Print error here
            console.log('Passwords do not match')
        }
        
    }

    render() {
        const { handleSubmit } = this.props
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h1>User Sign Up</h1>
                <Field 
                    name="first_name"
                    label="First Name"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    name="last_name"
                    label="Last Name"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    name="email"
                    label="Email"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    name="country"
                    label="Country"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    name="mobile_number"
                    label="Mobile Number"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    name="password"
                    label="Password"
                    type="password"
                    component={this.renderField}
                />
                <Field 
                    name="confirm_password"
                    label="Confirm Password"
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

    if (!values.first_name) {
        errors.first_name = <p className="form-errors">Enter your first name</p>
    }

    if (!values.last_name) {
        errors.last_name = <p className="form-errors">Enter your last name</p>
    }

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
    form: 'UserCreateForm'
})(
    connect(null, { createUser })(UserCreate)
)
