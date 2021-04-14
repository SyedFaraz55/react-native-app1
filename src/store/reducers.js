import {LOGIN} from './actionTypes'


export default function(state =[], action) {
    if(action.type === LOGIN) {
        return {
            ...state,
            ...action.payload

        }
    } else {
        return state;
    }
}