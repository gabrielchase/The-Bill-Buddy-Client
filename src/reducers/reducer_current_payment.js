import { FETCH_CURRENT_PAYMENT } from '../actions'


export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_CURRENT_PAYMENT: 
        return action.payload
    default: 
        return state
    }
}
