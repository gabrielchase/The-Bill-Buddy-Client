import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchCurrentBill } from '../actions'

import _ from 'lodash'


class BillPayments extends Component {
    async componentDidMount() {
        let { bill_id } = this.props.match.params
        await this.props.fetchCurrentBill(bill_id)
    }

    renderPayments() {
        let { current_bill } = this.props
        if (current_bill) {
            return _.map(current_bill.payments, (payment) => {
                return(
                    <tr key={payment.id}>
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
        return (
            <div>
                <h1>{current_bill.name} Payments</h1>
                <h4>Description: {current_bill.description}</h4>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Date Paid</th>
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
}

function mapStateToProps(state) {
    return {
        current_bill: state.current_bill
    }
}

export default connect(mapStateToProps, { fetchCurrentBill })(BillPayments)
