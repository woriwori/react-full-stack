import React from 'react';

const MsgItem = ({
    userId,
    timestamp,
    text
}) => {
    return (
        <li className="messages_item">
            <h3>
            {userId}{' '}
            <sub>
                {new Date(timestamp).toLocaleString('ko-KR', {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                })}
            </sub>
            </h3>
            {text}
        </li>
    );
};

export default MsgItem;