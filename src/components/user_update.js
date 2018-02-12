import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { fetchUser, updateUser } from '../actions'

import checkAuth from '../utils'


class UserUpdate extends Component {
    async componentDidMount() {
        await this.props.fetchUser()
        await this.handleInitialize()
    }

    async componentWillMount() {
        await checkAuth(this.props.history)
    }

    handleInitialize() {
        let { user } = this.props
        let initial_values = {
          'first_name': user.first_name,
          'last_name': user.last_name,
          'email': user.email,
          'country': user.details.country,
          'mobile_number': user.details.mobile_number
        }
        this.props.initialize(initial_values)
    }

    renderField(field) {
        return (
            <div>
                {field.value}
                <label htmlFor="">{field.label}</label>
                <input type={field.type} value={field.val ? field.val : ''}
                    { ...field.input }
                />
                {field.meta.touched ? field.meta.error : ''}
            </div>
        )
    }

    async onSubmit(values) {
        values.details = {
            country: values.country,
            mobile_number: values.mobile_number
        }
        delete values.country
        delete values.mobile_number
        
        await this.props.updateUser(values)
        await this.props.history.push('/dashboard')
    }

    render() {
        const { handleSubmit } = this.props
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h1>User Edit</h1>
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

function mapStateToProps(state) {
    return {
        user: state.user
    }
}


export default reduxForm({
    validate,
    form: 'UserUpdateForm'
})(
    connect(mapStateToProps, { fetchUser, updateUser })(UserUpdate)
)
