import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { createBill } from '../actions'
import CheckboxGroup  from './checkbox_group'

import { MONTHS, DAYS } from '../const'

import _ from 'lodash'


class BillNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'multiplePayments': false
        }
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

    monthsAndDays() {
        return (
            <div>
                <div className="months-column">
                    <h4 className="months-h4">Check Months To Pay Bill <span className="days-h4">Check Days to Pay Bill</span></h4>
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
                
                <label htmlFor="multiplePaymentsCheckbox">
                    <input 
                        id="multiplePaymentsCheckbox" 
                        type="checkbox" 
                        onChange={() => {
                            this.setState({'multiplePayments': !this.state.multiplePayments})
                        }}
                    />
                    <span className="option-span">Create Multiple Payments</span>
                </label>
                {
                    this.state.multiplePayments ? 
                    this.monthsAndDays()
                    :
                    <div></div>
                }
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
