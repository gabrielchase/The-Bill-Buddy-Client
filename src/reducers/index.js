import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import UserReducer from './reducer_users'
import AuthReducer from './reducer_auth'


const rootReducer = combineReducers({
    form: formReducer,
    auth: AuthReducer,
    user: UserReducer,
})

export default rootReducer
