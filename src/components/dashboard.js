import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { fetchUser } from '../actions'


class Dashboard extends Component {
    async componentDidMount() {
        await this.props.fetchUser()
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <h1>Dashboard</h1>
                <p>Welcome {user.first_name} {user.last_name}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchUser })(Dashboard)
