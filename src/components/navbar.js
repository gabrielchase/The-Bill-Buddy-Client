import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Navbar extends Component {
    async handleLogout() {
        await localStorage.removeItem('user_id')
        await localStorage.removeItem('jwt')
    }

    renderLinks() {
        if (localStorage.getItem('jwt')) {
            return(
                <div class="container">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/bills/new">New Bill</Link></li>
                    <div className="float-right">
                        <li><a href="/" onClick={this.handleLogout.bind(this)}>Logout</a></li>
                    </div>
                </div>
            )
        } else {
            return (
                <div class="container">
                    <li><Link to="">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </div>
            )
        }
    }

    render() {
        return (
            <div class="navbar">
                <ul>
                    {this.renderLinks()}
                </ul>
            </div>
        )
    }
}

export default Navbar
