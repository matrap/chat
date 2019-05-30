import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import SelectInput from '../common/SelectInput';
import TextInput from '../common/TextInput';
import * as chatActions from '../../actions/chatActions';

class ChatLogin extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            nickname: '',
            nicknameError: '',
            selectedTopic: 'default'
        };

        this.onLogin = this.onLogin.bind(this);
        this.onNicknameChange = this.onNicknameChange.bind(this);
        this.onTopicChange = this.onTopicChange.bind(this);
    }

    onLogin() {
        const { nickname, selectedTopic } = this.state;
        if(!this.state.nicknameError) {
            this.props.onLogin(selectedTopic, nickname);  
        }
    }

    onTopicChange(event) {
        const topic = event.target.value;
        return this.setState({ selectedTopic: topic });
    }

    onNicknameChange(event) {
        const nickname = event.target.value;
        if(nickname.length < 3) {
            this.setState({ nicknameError: 'Nickname is too short' });
        } else {
            this.setState({ nicknameError: null });          
        }
        return this.setState({ nickname: nickname });
    }

    render() {
        return (
            <div>
                <TextInput
                    name="nickname"
                    label="Nickname"
                    value={this.state.nickname}
                    error={this.state.nicknameError}
                    onChange={this.onNicknameChange}
                    placeholder="Write your nickname" />                
                <SelectInput
                    name="topic"
                    label="Topic"
                    value={this.state.topic}
                    options={this.props.topics}
                    onChange={this.onTopicChange} />
                <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary"
                    onClick={this.onLogin} />
            </div>
        );
    }
}

ChatLogin.propTypes = {
    onLogin: PropTypes.func.isRequired,
    topics: PropTypes.array.isRequired
};

export default ChatLogin;