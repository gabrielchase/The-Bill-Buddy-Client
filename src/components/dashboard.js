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

    renderServices() {
        return _.map(this.props.user.services, (service) => {
            return (
                <div key={ service }>
                    <Link to={`/services/${service}/`}>
                        <p>{ service }</p>
                    </Link>
                </div>
            )
        })
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <h1>Dashboard</h1>
                <p>Welcome {user.first_name} {user.last_name}</p>
                {this.renderServices()}
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
