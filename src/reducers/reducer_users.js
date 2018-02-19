import { 
    CREATE_USER_SUCCESS, CREATE_USER_FAILURE, 
    FETCH_USER, SORT_USER_PAYMENTS } from '../actions'


export default function(state = {}, action) {
    switch(action.type) {
    case CREATE_USER_SUCCESS: 
        return action.payload
    case CREATE_USER_FAILURE: 
        return action.payload
    case FETCH_USER:
        return action.payload
    case SORT_USER_PAYMENTS:
        return {...state, user: action.payload}
    default: 
        return state
    }
}