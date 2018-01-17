import { FETCH_BILLS } from '../actions'
import _ from 'lodash'


export default function(state = {}, action) {
    switch(action.type) {
    case FETCH_BILLS: 
        return _.mapKeys(action.payload, 'id')
    default: 
        return state
    }
}