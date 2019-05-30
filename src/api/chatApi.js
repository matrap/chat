import { getRequest, postRequest } from './xhr.js';

export function getUsers(topic) {
    const path = `/api/topics/${topic}/users`;
    return getRequest(path); 
}

export function getTopics() {
    const path = "/api/topics";
    return getRequest(path); 
}


