import React, { Component } from 'react'

import { callAPI } from '../utils'

class Dashboard extends Component {
    async componentWillMount() {
        await callAPI()
    }

    render() {
        return (
            <div>
                <h1>The Bill Buddy!</h1>
            </div>
        )
    }
}

export default Dashboard 
