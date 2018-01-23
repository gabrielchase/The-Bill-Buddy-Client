import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import UserReducer from './reducer_users'
import AuthReducer from './reducer_auth'
import BillReducer from './reducer_bills'
import CurrentBillReducer from './reducer_current_bill'
import ServiceReducer from './reducer_services'


const rootReducer = combineReducers({
    form: formReducer,
    auth: AuthReducer,
    user: UserReducer,
    bills: BillReducer,
    current_bill: CurrentBillReducer,
    services: ServiceReducer,
})

export default rootReducer
