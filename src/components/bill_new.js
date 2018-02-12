import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { createBill } from '../actions'

import { checkAuth } from '../utils'

import _ from 'lodash'


class BillNew extends Component {
    async componentWillMount() {
        await checkAuth(this.props.history)
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

    renderTextarea(field) {
        return (
            <div>
                <label htmlFor="">{field.label}</label>
                <textarea name={field.name} id="" cols="" rows="" {...field.input}></textarea>
                {field.meta.touched ? field.meta.error : ''}
            </div>
        )
    }
 
    async onSubmit(values) {
        let service_name = values.service_name.toLowerCase()
        values.service_name = service_name.charAt(0).toUpperCase() + service_name.slice(1)

        await this.props.createBill(values)
        await this.props.history.push('/bills')
    }

    render() {
        const { handleSubmit} = this.props
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h1>Add a Bill</h1>
                <Field 
                    name="name"
                    label="Name"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    name="service_name"
                    label="Company / Category"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    name="description"
                    label="Description"
                    type="text"
                    component={this.renderTextarea}
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

function validate(values) {
    let errors = {}

    if (!values.name) {
        errors.name = <p className="form-errors">Enter name of bill</p>
    }

    if (!values.service_name) {
        errors.service = <p className="form-errors">Put the company or category of this bill</p>
    }

    return errors
}

export default reduxForm({
    validate,
    form: 'BillNewForm'
})(
    connect(null, { createBill })(BillNew)
)
