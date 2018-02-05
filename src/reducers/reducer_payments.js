import { CREATE_PAYMENT, CREATE_PAYMENTS, UPDATE_PAYMENT } from '../actions'


export default function(state = {}, action) {
    switch(action.type) {
    case CREATE_PAYMENT: 
        return action.payload
    case CREATE_PAYMENTS: 
        return action.payload
    case UPDATE_PAYMENT: 
        return action.payload
    default: 
        return state
    }
}
