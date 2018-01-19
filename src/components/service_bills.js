import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchBills } from '../actions'

import _ from 'lodash'


class ServiceBills extends Component {
    async componentDidMount() {
        let { service_name } = this.props.match.params
        await this.props.fetchBills(service_name)
    }

    renderBills() {
        if (this.props.bills) {
            return _.map(this.props.bills, (bill) => {
                return (
                    <div key={ bill.id ? bill.id : bill }>
                        <p><strong>Name: { bill.name }</strong></p>
                        <p>Description: { bill.description }</p>
                        <p>Due Date: { bill.due_date }</p>  
                        <br/>
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
