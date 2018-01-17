import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchUser, fetchBills } from '../actions'

import _ from 'lodash'


class Dashboard extends Component {
    async componentDidMount() {
        await this.props.fetchUser()
        await this.props.fetchBills()
    }

    renderBills() {
        return _.map(this.props.bills, bill => {
            return (
                <div key={bill.id}>
                    <Link to={`/bills/${bill.id}/`}>
                        <p>{ bill.name }</p>
                    </Link>
                    <p>Description: { bill.description }</p>
                    <p>Due on the { bill.due_date }th</p>
                    <p>Service: { bill.service.name }</p>
                    <p>By: { bill.user_details.email } / { bill.user_details.username } </p>
                    <br/>
                </div>
            )
        })
    }

    render() {
        const { user, bills } = this.props
        return (
            <div>
                <h1>Dashboard</h1>
                <p>Welcome {user.first_name} {user.last_name}</p>
                {this.renderBills()}
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
