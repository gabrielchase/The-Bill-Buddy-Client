import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchCurrentBill, sortBillPayments, removeMessages } from '../actions'

import { checkAuth } from '../utils'

import _ from 'lodash'


class BillPayments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'sortAscend': false
        }
    }
    
    async componentWillMount() {
        await checkAuth(this.props.history)
    }
    
    async componentDidMount() {
        let { bill_id } = this.props.match.params
        await this.props.fetchCurrentBill(bill_id)
    }

    async sortBillPayments(category) {
        let { current_bill } = this.props
        this.setState({'sortAscend': !this.state.sortAscend})
        await this.props.sortBillPayments(current_bill, category, this.state.sortAscend)
    }

    renderPayments() {
        let { current_bill } = this.props
        if (current_bill) {
            return _.map(current_bill.payments, (payment, idx) => {
                let payment_url = `/bills/${current_bill.id}/payments/${payment.id}/edit`
                return (
                    <tr key={payment.id}>
                        <td><Link to={payment_url}>{idx+1}</Link></td>
                        <td>{payment.amount}</td>
                        <td>{payment.due_date}</td>
                        <td>{payment.status}</td>
                        <td>{payment.date_paid}</td>
                        <td>{payment.additional_notes}</td>
                    </tr>
                )
            })
        } else {
            return(
                <tr></tr>
            )
        }
    }

    render() {
        let { current_bill } = this.props
        let edit_url = `/bills/edit/${current_bill.id}`
        return (
            <div>
                <div className="float-right">
                    <Link className="button" to={edit_url}>Edit Bill</Link>
                </div>
                <h1>{current_bill.name} Payments</h1>
                <h4>{current_bill.description ? `Description: ${current_bill.description}` : ''}</h4>
                <h4>Service: {current_bill.instance_service_name}</h4>
                <h4>
                    {current_bill.total_bill_info ? `Lifetime Payment: ${current_bill.total_bill_info.lifetime_payment}` : ''}
                </h4>
                <h4>
                    {current_bill.total_bill_info ? `Payments This Year: ${current_bill.total_bill_info.payments_this_year}` : ''}
                </h4>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th onClick={() => this.sortBillPayments('amount')}>Amount</th>
                            <th onClick={() => this.sortBillPayments('due_date')}>Due Date</th>
                            <th onClick={() => this.sortBillPayments('status')}>Status</th>
                            <th onClick={() => this.sortBillPayments('date_paid')}>Date Paid</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderPayments()}
                    </tbody>
                </table>
            </div>
        )
    }

    componentWillUnmount() {
        this.props.removeMessages()
    }
}

function mapStateToProps(state) {
    return {
        current_bill: state.current_bill
    }
}

export default connect(mapStateToProps, { fetchCurrentBill, sortBillPayments, removeMessages })(BillPayments)
