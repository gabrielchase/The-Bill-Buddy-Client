import { ADD_MESSAGE, REMOVE_MESSAGES } from '../actions'


export default function(state = [], action) {
    switch(action.type) {
    case ADD_MESSAGE:
        let new_state = state.concat(action.payload)
        return new_state
    case REMOVE_MESSAGES:
        return []
    default: 
        return state
    }
}
