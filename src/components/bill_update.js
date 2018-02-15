import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { fetchCurrentBill, updateBill, addMessage } from '../actions'

import { checkAuth } from '../utils'


class BillUpdate extends Component {
    async componentWillMount() {
        await checkAuth(this.props.history)
    }

    async componentDidMount() {
        let { bill_id } = this.props.match.params
        await this.props.fetchCurrentBill(bill_id)
        await this.handleInitialize()
    }

    handleInitialize() {
        let { current_bill } = this.props
        let initial_values = {
          'name': current_bill.name,
          'description': current_bill.description,
          'due_date': current_bill.due_date,
          'service_name': current_bill.instance_service_name,
        }
        this.props.initialize(initial_values);
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
        let { bill_id } = this.props.match.params
        await this.props.updateBill(bill_id, values)
        await this.props.addMessage('Bill successfully updated')
        await this.props.history.push(`/bills/${bill_id}/payments`)
    }

    render() {
        const { handleSubmit } = this.props
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h1>Edit a Bill</h1>
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
        errors.service = <p className="form-errors">Please fill this up to better track your bills</p>
    }

    return errors
}

function mapStateToProps(state) {
    return {
        current_bill: state.current_bill
    }
}


export default reduxForm({
    validate,
    form: 'BillUpdateForm'
})(
    connect(mapStateToProps, { fetchCurrentBill, updateBill, addMessage })(BillUpdate)
)
