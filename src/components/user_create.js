import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

class UserCreate extends Component {
    render() {
        const { handleSubmit } = this.props
        return(
            <div>
                <h1>User Sign Up</h1>
            </div>
        )
    }
}

export default UserCreate
