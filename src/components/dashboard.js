import React, { Component } from 'react'
import { connect } from 'react-redux'
import {PieChart, Pie, Legend, Tooltip } from 'recharts'

import { fetchUser, fetchBills } from '../actions'

import _ from 'lodash'


const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]


class Dashboard extends Component {
    async componentDidMount() {
        await this.props.fetchUser()
    }

    renderPaymentsThisMonth() {
        let { user: { payments_this_month } } = this.props
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
                <br/>
                <h1 className="center-text">The Bill Buddy</h1>
                <h4 className="center-text">Welcome {user.first_name} {user.last_name} !</h4>

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
                        <PieChart width={800} height={300} className="pie-chart">
                            <Pie data={data01}  cx="50%" cy="50%" fill="#8884d8" label/>
                            <Tooltip/>
                        </PieChart>
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
