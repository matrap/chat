import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as chatActions from '../../actions/chatActions';
import ChatScreen from './ChatScreen';
import ChatInput from './ChatInput';
import ChatLogin from './ChatLogin';

const Chat = styled.div`
    padding: 10px;
`;

class ChatPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        this.props.actions.loadTopics();
    }

    onLogout() {
        const topic = this.props.login[0].topic;
        this.props.actions.logoutFromTopic(topic);
    }

    onLogin(topic, nickname) {
        const { actions } = this.props;
        actions.loginOnTopic(topic, nickname);
        actions.loadUsers(topic);
    }

    render() {
        const {
            topics,
            users,
            messages,
            actions
        } = this.props;

        const login = this.props.login[0];

        const isLogged = () => {
            return login && login.nickname && login.topic ;
        };

        return (
            <Chat>
                <h1>Chat</h1>
                {isLogged() ?
                    <div>
                        <ChatScreen
                            users={users}
                            messages={messages}
                            topic={login.topic}
                            nickname={login.nickname}
                            onLogout={this.onLogout} />
                        <ChatInput
                            onSend={actions.emitMsg}
                            topic={login.topic} />
                    </div> :
                    <ChatLogin
                        onLogin={this.onLogin}
                        topics={topics} />}
            </Chat>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(chatActions, dispatch)
    };
}

function mapStateToProps(state, ownProps) {
    return {
        login: state.login,
        topics: state.topics,
        messages: state.messages,
        users: state.users
    };
}

ChatPage.propTypes = {
    actions: PropTypes.object.isRequired,
    login: PropTypes.array,
    topics: PropTypes.array.isRequired,
    messages: PropTypes.array,
    users: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);

