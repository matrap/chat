
import * as types from './actionTypes';
import io from 'socket.io-client';
import * as chatApi from '../api/chatApi';

/* eslint-disable no-console */

const LOGIN_TOPIC = 'login';
const LOGOUT_TOPIC = 'logout';
let socket;

export function connect() {
    return function (dispatch) {
        try {
            socket = io();
            socket.on(LOGIN_TOPIC, function (msg) {
                if (msg.topic && msg.user) {
                    dispatch({ type: types.CHAT_USER_JOINED, msg });
                } else {
                    console.error("Login msg hasn't got topic or user");
                    dispatch({ type: types.CHAT_INFO_RECEIVED_FAILED });
                }
            });
            socket.on(LOGOUT_TOPIC, function (msg) {
                if (msg.topic && msg.user) {
                    dispatch({ type: types.CHAT_USER_LEFT, msg });
                } else {
                    console.error("Logout msg hasn't got topic or user");
                    dispatch({ type: types.CHAT_INFO_RECEIVED_FAILED });
                }
            });
        }
        catch (error) {
            console.error(error);
            return dispatch({ type: types.CONNECT_TO_CHAT_FAIL, error: error });
        }
        return dispatch({ type: types.CONNECT_TO_CHAT_SUCCESS });
    };
}

export function emitMsg(topic, msg) {
    return function (dispatch) {
        try {
            socket.emit(topic, msg);
        }
        catch (error) {
            console.error(error);
            return dispatch({ type: types.CHAT_MSG_EMITTED_FAIL, error: error });
        }
        return dispatch({ type: types.CHAT_MSG_EMITTED_SUCCESS });
    };
}

export function loginOnTopic(topic, nickname) {
    return function (dispatch) {
        const msg = { topic: topic, nickname: nickname };
        try {
            socket.on(topic, function (msg) {
                if (msg.author && msg.text) {
                    dispatch({ type: types.CHAT_TEXT_RECEIVED_SUCCESS, msg });
                } else {
                    console.error("Msg hasn't got author or text");
                    dispatch({ type: types.CHAT_TEXT_RECEIVED_FAILED });
                }
            });
            socket.emit(LOGIN_TOPIC, msg);
        }
        catch (error) {
            console.error(error);
            return dispatch({ type: types.LOGIN_TO_TOPIC_FAIL, error: error });
        }
        return dispatch({ type: types.LOGIN_TO_TOPIC_SUCCESS, msg });
    };
}

export function logoutFromTopic(topic) {
    return function(dispatch) {
        const msg = { topic: topic };
        try {
            socket.emit(LOGOUT_TOPIC, msg);
        }
        catch(error) {
            console.error(error);
            return dispatch({ type: types.LOGOUT_FROM_TOPIC_FAIL, error: error });           
        }
        return dispatch({ type: types.LOGOUT_FROM_TOPIC_SUCCESS, msg });
    };
}

export function loadUsers(topic) {
    return function (dispatch) {
        chatApi.getUsers(topic)
            .then(result => dispatch({
                type: types.CHAT_USERS_LOADED_SUCCESS,
                users: result
            }))
            .catch(error => {
                console.error(error.message, error.details);
                dispatch({
                    type: types.CHAT_USERS_LOADED_FAIL,
                    error: error
                });
            });
    };
}

export function loadTopics() {
    return function (dispatch) {
        chatApi.getTopics()
            .then(result => dispatch({
                type: types.CHAT_TOPICS_LOADED_SUCCESS,
                topics: result
            }))
            .catch(error => {
                console.error(error.message, error.details);
                dispatch({
                    type: types.CHAT_TOPICS_LOADED_FAIL,
                    error: error
                });
            });
    };
}

