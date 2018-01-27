import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { fetchCurrentPayment } from '../actions'


class PaymentUpdate extends Component {
    async componentDidMount() {
        let { payment_id } = this.props.match.params
        await this.props.fetchCurrentPayment(payment_id)
        await this.handleInitialize()
    }

    handleInitialize() {
        let { current_payment } = this.props
        let initial_values = {
          'amount': current_payment.amount,
          'due_date': current_payment.due_date,
          'date_paid': current_payment.date_paid,
          'status': current_payment.status,
          'additional_notes': current_payment.additional_notes
        }
        this.props.initialize(initial_values)
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

    renderStatusField(field) {
        return (
            <div>
                <label htmlFor="">{field.label}</label>
                <select {...field.input}>
                    <option value="" disabled>Select</option>
                    <option value="Not Paid">Not Paid</option>
                    <option value="Paid">Paid</option>
                </select>
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
        console.log(values)
    }
    
    render() {
        let { current_payment, handleSubmit } = this.props
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h1>Edit Payment</h1>
                <div className="row">
                    <div className="column column-50">
                        <Field 
                            name="amount"
                            label="Amount"
                            type="number"
                            component={this.renderField}
                        />
                    </div>
                    <div className="column column-50">
                        <Field 
                            name="due_date"
                            label="Due Date"
                            type="date"
                            component={this.renderField}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column column-50">
                        <Field 
                            name="status"
                            label="Status"
                            component={this.renderStatusField}
                        />
                    </div>
                    <div className="column column-50">
                        <Field 
                            name="date_paid"
                            label="Date Paid"
                            type="date"
                            component={this.renderField}
                        />
                    </div>
                </div>
                <Field 
                    name="additional_notes"
                    label="Additional Notes"
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

    if (!values.amount) {
        errors.name = 'Enter payment amount due/paid'
    }

    if (!values.status) {
        errors.service = 'Please fill this up to better track your bills'
    }

    return errors
}


function mapStateToProps(state) {
    return {
        current_payment: state.current_payment
    }
}

export default reduxForm({
    validate,
    form: 'PaymentUpdateForm'
})(
    connect(mapStateToProps, { fetchCurrentPayment })(PaymentUpdate)
)
