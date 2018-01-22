import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Navbar extends Component {
    async handleLogout() {
        await localStorage.removeItem('user_id')
        await localStorage.removeItem('jwt')
    }

    render() {
        if (localStorage.getItem('jwt')) {
            return (
                <div>
                    <Link to="/dashboard"><p>Dashboard</p></Link>
                    <Link to="/bills/new"><p>New Bill</p></Link>
                    <a href="/" onClick={this.handleLogout.bind(this)}><p>Logout</p></a>
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

export default Navbar
