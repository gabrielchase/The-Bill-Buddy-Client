import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'


class PaymentNew extends Component {
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
        console.log(values)
    }

    render() {
        const { handleSubmit} = this.props
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h1>Add a Payment</h1>
                <Field 
                    name="amount"
                    label="Amount"
                    type="number"
                    component={this.renderField}
                />
                <Field 
                    name="due_date"
                    label="Due Date"
                    type="date"
                    component={this.renderField}
                />
                <Field 
                    name="date_paid"
                    label="Date Paid"
                    type="date"
                    component={this.renderField}
                />
                <Field 
                    name="status"
                    label="Status"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    name="additional_notes"
                    label="Additional Notes"
                    type="text"
                    component={this.renderField}
                />
                <Field 
                    name="bill"
                    label="Bill"
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

    if (!values.amount) {
        errors.name = 'Enter payment amount due/paid'
    }

    if (!values.status) {
        errors.service = 'Please fill this up to better track your bills'
    }

    return errors
}

export default reduxForm({
    validate,
    form: 'PaymentNewForm'
})(
    connect(null, { })(PaymentNew)
)

