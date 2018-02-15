import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { fetchCurrentPayment, updatePayment } from '../actions'

import { checkAuth } from '../utils'


class PaymentUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'statusValue': null
        }
    }

    async componentWillMount() {
        await checkAuth(this.props.history)
    }
    
    async componentDidMount() {
        let { payment_id } = this.props.match.params
        await this.props.fetchCurrentPayment(payment_id)
        await this.handleInitialize()
    }

    async handleInitialize() {
        let { current_payment } = this.props
        let initial_values = {
          'amount': current_payment.amount,
          'due_date': current_payment.due_date,
          'date_paid': current_payment.date_paid,
          'status': current_payment.status,
          'additional_notes': current_payment.additional_notes
        }
        await this.setState({'statusValue': current_payment.status})
        await this.props.initialize(initial_values)
    }

    handleStatusChange() {
        this.setState({'statusValue': document.getElementById('payment-status').value})
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
                <select {...field.input} id="payment-status">
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
        let { payment_id } = this.props.match.params
        let { current_payment } = this.props
        if (!values.due_date) {
            delete values.due_date
        }
        if (!values.date_paid) {
            delete values.date_paid
        }
        values.bill_id = 0
        await this.props.updatePayment(payment_id, values)
        await this.props.history.push(`/bills/${current_payment.bill_id}/payments`)
    }
    
    render() {
        let { handleSubmit, current_payment } = this.props

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h1>Edit Payment</h1>
                <h4>{current_payment.bill_name ? `Bill: ${current_payment.bill_name}`: ''}</h4>
                <h4>{current_payment.service ? `Service: ${current_payment.service.name}`: ''}</h4>
                
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
                            onChange={this.handleStatusChange.bind(this)}
                        />
                    </div>
                    {
                        this.state.statusValue === 'Paid' ? 
                        <div className="column column-50">
                            <Field 
                                name="date_paid"
                                label="Date Paid"
                                type="date"
                                component={this.renderField}
                            />
                        </div> 
                        :
                        <div></div>
                    }
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
    connect(mapStateToProps, { fetchCurrentPayment, updatePayment })(PaymentUpdate)
)
