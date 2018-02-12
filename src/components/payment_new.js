import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { fetchBills, createPayment, createMultiplePayments } from '../actions'

import CheckboxGroup  from './checkbox_group'
import { checkAuth } from '../utils'

import { MONTHS, DAYS } from '../const'


import _ from 'lodash'


class PaymentNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'statusValue': '',
            'paymentType': ''
        }
    }
    
    async componentWillMount() {
        await checkAuth(this.props.history)
    }
    
    async componentDidMount() {
        await this.props.fetchBills()
    }

    renderMonthsAndDays() {
        let { statusValue, paymentType } = this.state
        return (
            <div>
                <br/>
                <div className="months-column">
                    <h4 className="months-h4">Check Months To Pay Bill <span className="days-h4">Check Days in the Month to Pay Bill</span></h4>
                    <div className="row">
                        <div className="column column-20">
                            <Field name="months" component={CheckboxGroup} options={MONTHS.slice(0,6)} />
                        </div>
                        <div className="column column-20">
                            <Field name="months" component={CheckboxGroup} options={MONTHS.slice(6,12)} />
                        </div>
                        <div className="column column-20">
                            <Field name="days" component={CheckboxGroup} options={DAYS.slice(0,10)} />
                        </div>
                        <div className="column column-20">
                            <Field name="days" component={CheckboxGroup} options={DAYS.slice(10,20)} />
                        </div>
                        <div className="column column-20">
                            <Field name="days" component={CheckboxGroup} options={DAYS.slice(20,31)} />
                        </div>
                    </div>
                </div>
            </div>
        )
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
        let { paymentType } = this.state
        let bill = await _.find(this.props.bills, (bill) => {
            return bill.id === parseInt(values.bill_id)
        })

        if (paymentType === 'Single') {
            await this.props.createPayment(values)
        } else if (paymentType === 'Multiple') {
            await this.props.createMultiplePayments(values)
        }
        
        await this.props.history.push(`/bills/${bill.id}/payments`)
    }

    render() {
        const { handleSubmit, bills} = this.props

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                
                <h1>Add a Payment</h1>    
                
                <div className="row">
                    <div className="column">
                        <Field 
                            name="bill_id"
                            label="Bill"
                            bills={bills}
                            component={this.renderBillField}
                        />
                    </div>
                </div>
                

                <div className="row">
                    <div className="column column-20">
                        <label htmlFor="" id="radio-label">Payment Type </label>
                        <br/>
                    </div>
                    <div className="column column-50">
                        <input id="single" name="payment-type" type="radio" onClick={() => this.setState({'paymentType': 'Single'})}/>
                        <label for="single" name="payment-type" id="radio-label">Single</label>

                        <input id="multiple" name="payment-type" type="radio" onClick={() => this.setState({'paymentType': 'Multiple'})}/>
                        <label for="multiple" name="payment-type" id="radio-label">Multiple</label>
                    </div>
                </div>
                
                {
                    this.state.paymentType === 'Single' ? 
                    <div>
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
                        <Field 
                            name="additional_notes"
                            label="Additional Notes"
                            type="text"
                            component={this.renderTextarea}
                        />
                    </div>
                    :
                    <div></div>
                } 
                
                { 
                    this.state.paymentType === 'Multiple' ?
                    this.renderMonthsAndDays()
                    :
                    <div></div>
                }
                <br/>
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
    form: 'PaymentNewForm'
})(
    connect(mapStateToProps, { fetchBills, createPayment, createMultiplePayments })(PaymentNew)
)

