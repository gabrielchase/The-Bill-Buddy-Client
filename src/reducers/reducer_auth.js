import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../actions'


export default function(state = {}, action) {
    switch(action.type) {
    case LOGIN_USER_SUCCESS:
        return action.payload
    default: 
        return state
    }
}