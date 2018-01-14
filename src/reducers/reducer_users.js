import { CREATE_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../actions'


export default function(state = {}, action) {
    switch(action.type) {
    case CREATE_USER: 
        return action.payload
    case LOGIN_USER_SUCCESS:
        return action.payload
    default: 
        return state
    }
}