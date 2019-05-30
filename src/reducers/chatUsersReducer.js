import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatUsersReducer(state = initialState.users, action) {
    switch(action.type) {
        case types.CHAT_USERS_LOADED_SUCCESS:
            return action.users;
        case types.CHAT_USER_JOINED:
            return [
                ...state.filter(user => user.id !== action.msg.user.id),
                Object.assign({}, action.msg.user)
            ];        
        case types.CHAT_USER_LEFT:
            return [
                ...state.filter(user => user.id !== action.msg.user.id)
            ];   
        case types.LOGOUT_FROM_TOPIC_SUCCESS:
            return initialState.messages;            
        default:
            return state;
    }
}