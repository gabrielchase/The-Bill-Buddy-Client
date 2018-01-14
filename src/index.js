import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import promise from 'redux-promise'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import reducers from './reducers'
import UserRegister from './components/user_register'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)
injectTapEventPlugin()


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <MuiThemeProvider>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/register" component={UserRegister} />
                    </Switch>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
document.getElementById('root'));
registerServiceWorker();
