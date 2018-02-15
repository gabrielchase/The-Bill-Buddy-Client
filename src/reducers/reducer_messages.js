import { ADD_MESSAGE } from '../actions'


export default function(state = [], action) {
    switch(action.type) {
    case ADD_MESSAGE:
        console.log('in ADD_MESSAGE reducer: ', action.payload)
        let new_state = state.concat(action.payload)
        console.log('new state: ', new_state)
        return new_state
    default: 
        return state
    }
}
