import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import ChatLine from './ChatLine';
import styled from 'styled-components';

const Screen = styled.div`
    display: flex;
`;

const Messages = styled.div`
    display: flex;
    flex-direction: column;  
    width: 100%;  
    max-height: 450px;
    overflow-y: auto;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    align-items: flex-start;   
    margin-right: 20px;
`;

const LabelLine = styled.div`
    padding: 1px 0px;
    white-space: nowrap;
`;

const LabelGroup = styled.div`
    padding: 3px 0px;
`;

class ChatScreen extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidUpdate() {
        this.scroolChatToLastMsg();
    }

    scroolChatToLastMsg() {
        const elem = document.getElementById("chat-frame");
        elem.scrollTop = elem.scrollHeight;
    }

    render() {
        const { 
            messages,
            users,
            topic,
            nickname,
            onLogout
        } = this.props;

        return (
            <Screen>
                <Info>
                    <LabelGroup>
                        <button 
                            className="btn btn-secondary"
                            onClick={onLogout}>Logout</button>
                    </LabelGroup>                    
                    <LabelGroup>
                        <LabelLine><strong>Topic</strong></LabelLine>
                        <LabelLine>{topic}</LabelLine>
                    </LabelGroup>
                    <LabelGroup>
                        <LabelLine><strong>Nickname</strong></LabelLine>
                        <LabelLine>{nickname}</LabelLine>
                    </LabelGroup>
                    <LabelGroup>
                        <LabelLine><strong>Participants</strong> ({users.length})</LabelLine>
                        {users.map(user => {
                            return (<LabelLine key={user.id}>{user.nickname}</LabelLine>);
                        })}
                    </LabelGroup>
                </Info>
                <Messages id="chat-frame">
                    {messages.map(msg => {
                        const key = messages.indexOf(msg);
                        return (<ChatLine key={key} msg={msg} />);
                    })}
                </Messages>
            </Screen>
        );
    }
}

ChatScreen.propTypes = {
    messages: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    topic: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default ChatScreen;