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
    const [editingId, setEditingId] = useState(null)
    const onCreate = text => {
        const newMsg = {
            id: msgs.length + 1,
            userId: getRandomUserId(),
            timestamp: Date.now(),
            text: `${msgs.length + 1} ${text}`
        }
        setMsgs(msgs => [newMsg, ...msgs])
    }
    const onUpdate = (text, id) => {
        setMsgs(msgs => {
            // 밖에서 state를 가져오기보단 setState를 함수형으로 활용하는게 안정적으로 확실한 msgs를 가져올 수 있다.
            const targetIndex = msgs.findIndex(msg => msg.id === id);
            if(targetIndex < 0) return msgs;
            const newMsgs = [...msgs]
            newMsgs.splice(targetIndex, 1, {
                ...msgs[targetIndex],
                text
            })
            return newMsgs
        })
        doneEdit()
    }
    const doneEdit = () => setEditingId(null)
    const onDelete = (id) => {
        setMsgs(msgs => {
            const targetIndex = msgs.findIndex(msg => msg.id === id);
            if(targetIndex < 0) return msgs;
            const newMsgs = [...msgs]
            newMsgs.splice(targetIndex, 1, )
            return newMsgs
        })
    }
    return (
        <>
            <MsgInput mutate={onCreate}/>
            <ul className="messages">
                {
                    msgs.map((value,i) => <MsgItem key={i} onUpdate={onUpdate} startEdit={() => setEditingId(value.id)} isEditing={editingId === value.id} onDelete={() => onDelete(value.id)} {...value}/>)
                }
            </ul>
        </>
    );
};

export default MsgList;