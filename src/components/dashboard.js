import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchUser, fetchBills } from '../actions'

import _ from 'lodash'


class Dashboard extends Component {
    async componentDidMount() {
        await this.props.fetchUser()
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <h1>Dashboard</h1>
                <h4>Welcome {user.first_name} {user.last_name}</h4>
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
