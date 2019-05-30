import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatLoginReducer(state = initialState.users, action) {
    switch(action.type) {
        case types.LOGIN_TO_TOPIC_SUCCESS:
            return [ action.msg ];
        case types.LOGOUT_FROM_TOPIC_SUCCESS:
            return initialState.messages;      
        default:
            return state;
    }
}