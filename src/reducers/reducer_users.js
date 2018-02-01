import { CREATE_USER, FETCH_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, SORT_USER_PAYMENTS } from '../actions'


export default function(state = {}, action) {
    switch(action.type) {
    case CREATE_USER: 
        return action.payload
    case FETCH_USER:
        return action.payload
    case SORT_USER_PAYMENTS:
        return {...state, user: action.payload}
    default: 
        return state
    }
}