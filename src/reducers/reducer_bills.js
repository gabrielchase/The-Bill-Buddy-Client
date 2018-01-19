import { FETCH_BILLS, CREATE_BILL } from '../actions'
import _ from 'lodash'


export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_BILLS: 
        return action.payload
    case CREATE_BILL:
        return action.payload
    default: 
        return state
    }
}
