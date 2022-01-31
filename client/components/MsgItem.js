import React from 'react';
import MsgInput from "./MsgInput";

const MsgItem = ({
    id,
    userId,
    timestamp,
    text,
    onUpdate,
    onDelete,
    startEdit,
    isEditing,
    currentUserId
}) => {
    return (
        <li className="messages__item">
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
            <div className="messages__content">
                {
                    isEditing?
                        <MsgInput mutate={onUpdate} id={id} text={text}/>
                        :
                        text
                }
                <div>
                    {
                        (userId === currentUserId) && !isEditing &&
                            <>
                                <button className='messages__buttons' onClick={startEdit}>수정</button>
                                <button className='messages__buttons' onClick={onDelete}>삭제</button>
                            </>
                    }
                </div>
            </div>
        </li>
    );
};

export default MsgItem;