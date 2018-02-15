import React, { Component } from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'


class Messages extends Component {
    renderMessages() {
        if (this.props.messages.length != 0) {
            return _.map(this.props.messages, (message, idx) => {
                return (
                    <li className="message" key={idx}>{message}</li>
                )
            })
        }
    }

    render() {
        return (
            <div className="container">
                <br/>
                <div className="center-text">
                    <ul className="messages">
                        {this.renderMessages()}
                    </ul>
                </div>  
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        messages: state.messages,
    }
}

export default connect(mapStateToProps, {})(Messages)
