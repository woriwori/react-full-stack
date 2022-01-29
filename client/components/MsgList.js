import React from 'react';
import MsgItem from "./MsgItem";

const UserIds = ['roy', 'jay']
const getRandomUserId = () => UserIds[Math.round(Math.random())]
const msgs = Array(50).fill(null).map((_,i) => ({
    id: i+1,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + (50 - i) * 1000 * 60, // 50-i : 시간 내림차순 정렬을 위해
    text: `${i+1} mock text`
}))

const MsgList = () => {
    return (
        <ul className="messages">
            {
                msgs.map((value,i) => <MsgItem key={i} {...value}/>)
            }
        </ul>
    );
};

export default MsgList;