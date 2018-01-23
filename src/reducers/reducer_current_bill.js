import { FETCH_CURRENT_BILL } from '../actions'


export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_CURRENT_BILL: 
        return action.payload
    default: 
        return state
    }
}
