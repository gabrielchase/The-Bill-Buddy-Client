import { FETCH_BILLS } from '../actions'
import _ from 'lodash'


export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_BILLS: 
        return action.payload
    default: 
        return state
    }
}
