import { combineReducers } from 'redux';
import messages from './chatMsgReducer';
import users from './chatUsersReducer';
import topics from './chatTopicsReducer';
import login from './chatLoginReducer';

const rootReducer = combineReducers({
    login,
    topics,
    users,
    messages
});

export default rootReducer;