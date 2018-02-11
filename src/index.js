import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import reducers from './reducers'

import LandingPage from './components/landing_page'
import UserCreate from './components/user_create'
import UserLogin from './components/user_login'
import UserUpdate from './components/user_update'
import Dashboard from './components/dashboard'
import BillIndex from './components/bill_index'
import BillPayments from './components/bill_payments'
import BillNew from './components/bill_new'
import BillUpdate from './components/bill_update'
import PaymentNew from './components/payment_new'
import PaymentUpdate from './components/payment_update'
import Navbar from './components/navbar'

import { ROOT_URL } from './const'

console.log('ROOT_URL: ', ROOT_URL)

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)
injectTapEventPlugin()


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <MuiThemeProvider>
            <BrowserRouter>
                <div>
                    <Navbar />
                    <br/>
                    <div className="container">
                        <Switch>
                            <Route path="/bills/:bill_id/payments/:payment_id/edit" component={PaymentUpdate} />
                            <Route path="/bills/:bill_id/payments" component={BillPayments} />
                            <Route path="/bills/new" component={BillNew} />
                            <Route path="/bills/edit/:bill_id" component={BillUpdate} />
                            <Route path="/bills" component={BillIndex} />
                            <Route path="/payment/new" component={PaymentNew} />
                            <Route path="/profile/edit" component={UserUpdate} />
                            <Route path="/register" component={UserCreate} />
                            <Route path="/login" component={UserLogin} />
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="" component={LandingPage} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
document.getElementById('root'));
registerServiceWorker();
