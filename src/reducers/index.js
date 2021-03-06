import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import UserReducer from './reducer_users'
import AuthReducer from './reducer_auth'
import BillReducer from './reducer_bills'
import PaymentReducer from './reducer_payments'
import CurrentBillReducer from './reducer_current_bill'
import CurrentPaymentReducer from './reducer_current_payment'
import ServiceReducer from './reducer_services'
import MessageReducer from './reducer_messages'


const rootReducer = combineReducers({
    form: formReducer,
    auth: AuthReducer,
    user: UserReducer,
    bills: BillReducer,
    current_bill: CurrentBillReducer,
    payments: PaymentReducer,
    current_payment: CurrentPaymentReducer,
    services: ServiceReducer,
    messages: MessageReducer
})

export default rootReducer
