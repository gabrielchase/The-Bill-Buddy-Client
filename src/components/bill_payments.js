import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchBills } from '../actions'

import _ from 'lodash'


class BillPayments extends Component {
    async componentDidMount() {
        let { service_name } = this.props.match.params
        await this.props.fetchBills(service_name)
    }

    renderPayments() {
        let { bill_id } = this.props.match.params
        bill_id = parseInt(bill_id)
        
        let current_bill = _.find(this.props.bills, (bill) => {
            return bill.id === bill_id
        })
        
        if (current_bill) {
            return _.map(current_bill.payments, (payment) => {
                return(
                    <div key={payment.id}>
                        <p>Amount: {payment.amount}</p>
                        <p>Due date: {payment.due_date}</p>
                        <p>Status: {payment.status}</p>
                        <p>Additional Notes: {payment.additional_notes}</p>
                        <br/>
                    </div>
                )
            })
        } else {
            return(
                <div></div>
            )
        }
        
    }

    render() {
        return (
            <div>
                <h1>Bill Payments</h1>
                {this.renderPayments()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        bills: state.bills
    }
}

export default connect(mapStateToProps, { fetchBills })(BillPayments)

