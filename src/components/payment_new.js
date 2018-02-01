import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { fetchBills, createPayment } from '../actions'

import _ from 'lodash'


class PaymentNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'statusValue': null
        }
    }
    async componentDidMount() {
        await this.props.fetchBills()
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

    handleStatusChange() {
        this.setState({'statusValue': document.getElementById('payment-status').value})
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

    renderBillField(field) {
        if (field.bills) {
            let options = _.map(field.bills, (bill) => {
                if (bill) {
                    return (
                        <option key={bill.id} value={bill.id}>{bill.name}</option>
                    )
                } else {
                    return (
                        <option value=""></option>
                    )
                }
            })
            
            return (
                <div>
                    <label htmlFor="">{field.label}</label>
                    <select {...field.input}>
                        <option value="" disabled>Select</option>
                        {options}
                    </select>
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            )
        } else { 
            return (
                <div></div>
            )
        }        
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
        let bill = await _.find(this.props.bills, (bill) => {
            console.log(bill.id, typeof(bill.id))
            return bill.id === parseInt(values.bill_id)
        })
        await this.props.createPayment(values)
        await this.props.history.push(`/bills/${bill.id}/payments`)
    }

    render() {
        const { handleSubmit, bills} = this.props
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h1>Add a Payment</h1>
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
                    name="bill_id"
                    label="Bill"
                    bills={bills}
                    component={this.renderBillField}
                />
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
        bills: state.bills,
    }
}

export default reduxForm({
    validate,
    form: 'PaymentNewForm',
    hasStatusValue: document.getElementsByName('status').value
})(
    connect(mapStateToProps, { fetchBills, createPayment })(PaymentNew)
)

