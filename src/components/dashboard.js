import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'
import { Link } from 'react-router-dom'

import { fetchUser, sortPaymentsThisMonth, addMessage, removeMessages } from '../actions'

import { COLORS } from '../const'
import { checkAuth, callAPI } from '../utils'

import _ from 'lodash'


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'sortAscend': false
        }
    }

    async componentWillMount() {
        await callAPI()
        await checkAuth(this.props.history)
    }
    
    async componentDidMount() {
        await this.props.fetchUser()
    }

    async sortPayments(category) {
        let { user } = this.props
        this.setState({'sortAscend': !this.state.sortAscend})
        await this.props.sortPaymentsThisMonth(user, category, this.state.sortAscend)
    }

    renderPaymentsThisMonth() {
        let { user: { payments_this_month } } = this.props
        return (
            _.map(payments_this_month, (payment, idx) => {
                let payment_url = `/bills/${payment.bill_id}/payments/${payment.id}/edit`
                return (
                    <tr key={payment.id}>
                        <td><Link to={payment_url}>{idx+1}</Link></td>
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

    renderPieChart(data) {
        if (data) {
            return (
                <PieChart width={800} height={300}>
                    <Pie data={data}  cx="50%" cy="50%" fill="#8884d8">
                        {data.map((datum, index) => 
                            <Cell fill={COLORS[index % COLORS.length]} />
                        )}
                    </Pie>
                    <Legend/>
                    <Tooltip/>
                </PieChart>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    render() {
        let { user } = this.props
        console.log(user)
        let piechart_data = []
        
        for (let key in user.expenditure_this_year) {
            if (key !== 'total' && !_.includes(key, '_percentage')) {
                let obj = {
                    'name': key,
                    'value': user.expenditure_this_year[key]
                }
                piechart_data.push(obj)
            }
        }

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
                                    <th onClick={() => this.sortPayments('due_date')}>Due Date</th>
                                    <th onClick={() => this.sortPayments('service')}>Service</th>
                                    <th onClick={() => this.sortPayments('bill_name')}>Bill</th>
                                    <th onClick={() => this.sortPayments('status')}>Status</th>
                                    <th onClick={() => this.sortPayments('amount')}>Amount</th>
                                </tr>
                            </thead>
                            {this.renderPaymentsThisMonth()}
                        </table>
                    </div>
                    <div className="column" id="expenditure">
                        <h4 className="center-text">Expenditure This Year</h4>
                        {this.renderPieChart(piechart_data)}
                    </div>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        this.props.removeMessages()
    }
}

function mapStateToProps(state) {
    return { 
        user: state.user,
    }
}

export default connect(mapStateToProps, { fetchUser, sortPaymentsThisMonth, addMessage, removeMessages })(Dashboard)
