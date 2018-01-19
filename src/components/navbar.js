import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Navbar extends Component {
    render() {
        const { user } = this.props
        if (user.id) {
            return (
                <div>
                    <Link to="/dashboard"><p>Dashboard</p></Link>
                    <Link to="/bills/new"><p>New Bill</p></Link>
                    <Link to="/logout"><p>Logout</p></Link>
                </div>
            )
        } else {
            return (
                <div>
                    <Link to=""><p>Home</p></Link>
                    <Link to="/register"><p>Register</p></Link>
                    <Link to="/login"><p>Login</p></Link>
                </div>
            )
        }
        
    }
}

function mapStateToProps(state) {
    return { 
        user: state.user
    }
}

export default connect(mapStateToProps, { })(Navbar)
