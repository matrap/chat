import * as types from '../actions/actionTypes';
import initialState from './initialState';
import update from 'immutability-helper';

export default function chatMsgReducer(state = initialState.messages, action) {
    switch(action.type) {
        case types.CHAT_TEXT_RECEIVED_SUCCESS:
            return update(state, {
                $push: [action.msg]
            }); 
        case types.CHAT_USER_JOINED:
            return update(state, {
                $push: [{text: `${action.msg.user.nickname} has joined to the chat`}]
            }); 
        case types.CHAT_USER_LEFT:
            return update(state, {
                $push: [{text: `${action.msg.user.nickname} has left the chat`}]
            }); 
        case types.LOGOUT_FROM_TOPIC_SUCCESS:
            return initialState.messages;
        default:
            return state;
    }
}