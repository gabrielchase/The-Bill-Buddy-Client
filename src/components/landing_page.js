import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { fetchUser } from '../actions'


class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>The Bill Buddy!</h1>
            </div>
        )
    }
}

export default Dashboard 
