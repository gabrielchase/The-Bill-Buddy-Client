import { FETCH_BILLS, CREATE_BILL, CREATE_PAYMENT, UPDATE_BILL } from '../actions'


export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_BILLS: 
        return action.payload
    case CREATE_BILL:
        return action.payload
    case CREATE_PAYMENT: 
        return action.payload
    case UPDATE_BILL: 
        return action.payload
    default: 
        return state
    }
}
