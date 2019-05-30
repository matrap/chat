import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatTopicsReducer(state = initialState.users, action) {
    switch(action.type) {
        case types.CHAT_TOPICS_LOADED_SUCCESS:
            return action.topics;         
        default:
            return state;
    }
}