import React, {useState} from 'react';
import MsgItem from "./MsgItem";
import MsgInput from "./MsgInput";

const UserIds = ['roy', 'jay']
const getRandomUserId = () => UserIds[Math.round(Math.random())]
const defaultMsgs = Array(50).fill(null).map((_,i) => ({
    id: i+1,
    userId: getRandomUserId(),
    timestamp: 1234567890123 + (50 - i) * 1000 * 60, // 50-i : 시간 내림차순 정렬을 위해
    text: `${i+1} mock text`
}))

const MsgList = () => {
    const [msgs, setMsgs] = useState(defaultMsgs)
    const onCreate = text => {
        const newMsg = {
            id: msgs.length + 1,
            userId: getRandomUserId(),
            timestamp: Date.now(),
            text: `${msgs.length + 1} ${text}`
        }
        setMsgs(msgs => [newMsg, ...msgs])
    }
    return (
        <>
            <MsgInput mutate={onCreate}/>
            <ul className="messages">
                {
                    msgs.map((value,i) => <MsgItem key={i} {...value}/>)
                }
            </ul>
        </>
    );
};

export default MsgList;