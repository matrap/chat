import React from 'react';
import { PropTypes } from 'prop-types';
import Hotkeys from 'react-hot-keys';
import styled from 'styled-components';
import TextInput from '../common/TextInput';

const OneLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 0px;
`;

const Input = styled.input`
    margin: 0px 10px 0px 0px;
`;

class ChatInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            input: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onChange(event) {
        const input = event.target.value;
        return this.setState({ input: input });
    }

    onSend(event) {
        const { topic, onSend } = this.props;
        const msg = this.state.input;
        if (msg) {
            onSend(topic, msg);
            this.setState({ input: '' });
        }
    }

    onKeyDown(keyName, e, handle) {
        this.onSend(e);
    }

    render() {
        return (
            <OneLine>
                <Hotkeys
                    keyName="enter"
                    onKeyDown={this.onKeyDown} >
                    <Input
                        type="text"
                        className="form-control"
                        placeholder="Write somethink"
                        value={this.state.input}
                        onChange={this.onChange} />
                </Hotkeys>
                <input
                    type="submit"
                    value="Send"
                    className="btn btn-primary"
                    onClick={this.onSend} />
            </OneLine>
        );
    }
}

ChatInput.propTypes = {
    topic: PropTypes.string,
    onSend: PropTypes.func.isRequired
};

export default ChatInput;