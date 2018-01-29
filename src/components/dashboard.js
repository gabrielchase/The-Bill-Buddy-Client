import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchUser, fetchBills } from '../actions'

import _ from 'lodash'


class Dashboard extends Component {
    async componentDidMount() {
        await this.props.fetchUser()
    }

    renderPaymentsThisMonth() {
        let { user: { payments_this_month } } = this.props
        console.log(payments_this_month)
        return (
            _.map(payments_this_month, (payment, idx) => {
                return (
                    <tr key={payment.id}>
                        <td>{idx+1}</td>
                        <td>{payment.due_date}</td>
                        <td>{payment.service}</td>
                        <td>{payment.bill_name}</td>
                        <td>{payment.status}</td>
                        <td>{payment.amount}</td>
                    </tr>
                )
            })
        )
    }

    render() {
        let { user } = this.props
        return (
            <div>
                <h1>Dashboard</h1>
                <h4>Welcome {user.first_name} {user.last_name}</h4>

                <div className="row">
                    <div className="column" id="payments">
                        <h4 className="center-text">Payments Due This Month</h4>
                        <br/>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Due Date</th>
                                    <th>Service</th>
                                    <th>Bill</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            {this.renderPaymentsThisMonth()}
                        </table>
                    </div>
                    <div className="column" id="expenditure">
                        <h4 className="center-text">Expenditure This Year</h4>
                    </div>
                </div>
                

                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        user: state.user,
        bills: state.bills
    }
}

export default connect(mapStateToProps, { fetchUser, fetchBills })(Dashboard)
