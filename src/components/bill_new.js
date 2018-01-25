import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { createBill } from '../actions'


class BillNew extends Component {
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
        let service_name = values.service_name.toLowerCase()
        service_name = service_name.charAt(0).toUpperCase() + service_name.slice(1)
        
        values.service_name = service_name
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
                    name="description"
                    label="Description"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    name="due_date"
                    label="Due Date"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    name="service_name"
                    label="Service"
                    type="text"
                    component={this.renderField}
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

    if (!values.description) {
        errors.description = <p className="form-errors">Enter a small description about the bill</p>
    }

    if (!values.service_name) {
        errors.service = <p className="form-errors">Please fill this up to better track your bills</p>
    }

    return errors
}

export default reduxForm({
    validate,
    form: 'BillNewForm'
})(
    connect(null, { createBill })(BillNew)
)
