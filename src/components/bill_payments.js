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
        let { current_bill } = this.props
        return (
            <div>
                <div className="float-right">
                    <Link className="button" to="/payment/new"> Add a New Payment </Link>
                </div>
                <h1>{current_bill.name} Payments</h1>
                <h4>Description: {current_bill.description}</h4>
                <br/>
                {this.renderPayments()}
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
