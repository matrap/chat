import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const OneLine = styled.div`
    padding: 2px 0px;
`;

const ChatLine = ({ msg }) => {
    if (msg.author) {
        return (
            <OneLine>
                <strong>{msg.author.nickname}:</strong> {msg.text}
            </OneLine>);
    } else {
        return (
            <OneLine>
                <em>{msg.text}</em>
            </OneLine>);
    }
};

ChatLine.propTypes = {
    msg: PropTypes.object.isRequired
};

export default ChatLine;