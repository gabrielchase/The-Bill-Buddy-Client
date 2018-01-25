import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchUser, fetchBills } from '../actions'


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
