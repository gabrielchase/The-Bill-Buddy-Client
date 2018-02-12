import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchServices } from '../actions'

import checkAuth from '../utils'

import _ from 'lodash'


class BillIndex extends Component {
    async componentWillMount() {
        await checkAuth(this.props.history)
    }

    async componentDidMount() {
        await this.props.fetchServices()
    }

    renderBills(service_name, bills) {
        return _.map(bills, (bill) => {
            return (
                <li key={bill.id}>
                    <Link to={`/bills/${bill.id}/payments`}>{bill.name}</Link>
                </li>
            )
        })
    }

    renderServicesBills() {
        let { services } = this.props
        if (services) {
            return _.map(services, (service) => {
                return (
                    <div className="column column-100" key={ service.id ? service.id : service }>
                        <h4>{ service.name }</h4>
                        <ul>
                            {this.renderBills(service.name, service.bills)}
                        </ul>
                    </div>
                )
            })
        } else {
            return(<div></div>)
        }
    }

    render() {
        return (
            <div>
                <h1>My Bills</h1>
                <br/>
                <div className="row">
                    {this.renderServicesBills()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        services: state.services,
    }
}

export default connect(mapStateToProps, { fetchServices })(BillIndex)
