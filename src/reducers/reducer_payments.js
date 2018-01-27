import { UPDATE_PAYMENT } from '../actions'


export default function(state = {}, action) {
    switch(action.type) {
    case UPDATE_PAYMENT: 
        return action.payload
    default: 
        return state
    }
}
