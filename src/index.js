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
import Dashboard from './components/dashboard'
import ServiceBills from './components/service_bills'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)
injectTapEventPlugin()


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <MuiThemeProvider>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/services/:service_name" component={ServiceBills} />
                        <Route path="/register" component={UserCreate} />
                        <Route path="/login" component={UserLogin} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="" component={LandingPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
document.getElementById('root'));
registerServiceWorker();
