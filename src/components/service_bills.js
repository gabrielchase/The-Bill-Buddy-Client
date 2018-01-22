import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchBills } from '../actions'

import _ from 'lodash'


class ServiceBills extends Component {
    async componentDidMount() {
        let { service_name } = this.props.match.params
        await this.props.fetchBills(service_name)
    }

    renderBills() {
        let { service_name } = this.props.match.params
        if (this.props.bills) {
            return _.map(this.props.bills, (bill) => {
                return (
                    <div key={ bill.id ? bill.id : bill }>
                        <Link to={`/services/${service_name}/bills/${bill.name}/payments`}>
                            <p>{ bill.name }</p>
                        </Link>
                    </div>
                )
            })
        } else {
            return(<div></div>)
        }
    }

    render() {
        let { service_name } = this.props.match.params
        return (
            <div>
                <h1>{ service_name } Bills</h1>
                {this.renderBills()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        bills: state.bills
    }
}

export default connect(mapStateToProps, { fetchBills })(ServiceBills)
