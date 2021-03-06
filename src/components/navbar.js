import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Navbar extends Component {
    async handleLogout() {
        await localStorage.removeItem('user_id')
        await localStorage.removeItem('jwt')
    }

    renderLinks() {
        if (localStorage.getItem('jwt')) {
            return(
                <div className="container">
                    <li><Link to="/dashboard">Home</Link></li>
                    <li><Link to="/bills">My Bills</Link></li>
                    <li><Link to="/bills/new">New Bill</Link></li>
                    <li><Link to="/payment/new">New Payment</Link></li>
                    <div className="float-right">
                        <li><Link to="/profile/edit">Update Profile</Link></li>
                        <li><a href="/" onClick={this.handleLogout.bind(this)}>Logout</a></li>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <li><Link to="">Home</Link></li>
                    <div className="float-right">
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="navbar">
                <ul>
                    {this.renderLinks()}
                </ul>
            </div>
        )
    }
}

export default Navbar
