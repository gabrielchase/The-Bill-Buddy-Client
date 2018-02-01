import { FETCH_CURRENT_BILL, SORT_BILL_PAYMENTS } from '../actions'


export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_CURRENT_BILL: 
        return action.payload
    case SORT_BILL_PAYMENTS:
        return {...state, current_bill: action.payload}
    default: 
        return state
    }
}
