import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MsgItem from './MsgItem';
import MsgInput from './MsgInput';
import fetcher from '../fetcher';

const MsgList = ({ smsgs, susers }) => {
  const {
    query: { userId = '' },
  } = useRouter();
  const [msgs, setMsgs] = useState(smsgs);
  const [editingId, setEditingId] = useState(null);
  const onCreate = async (text) => {
    const newMsg = await fetcher('post', '/messages', {
      text,
      userId,
    });
    if (!newMsg) throw Error('create failed');

    setMsgs((msgs) => [newMsg, ...msgs]);
  };
  const onUpdate = async (text, id) => {
    const newMsg = await fetcher('put', `/messages/${id}`, {
      text,
      userId,
    });
    if (!newMsg) throw Error('update failed');
    setMsgs((msgs) => {
      // 밖에서 state를 가져오기보단 setState를 함수형으로 활용하는게 안정적으로 확실한 msgs를 가져올 수 있다.
      const targetIndex = msgs.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) return msgs;

      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1, newMsg);

      return newMsgs;
    });
    doneEdit();
  };
  const doneEdit = () => setEditingId(null);
  const onDelete = async (id) => {
    const deletedId = await fetcher('delete', `/messages/${id}`, {
      params: { userId },
    });
    if (!deletedId) throw Error('update failed');

    setMsgs((msgs) => {
      const targetIndex = msgs.findIndex((msg) => msg.id === deletedId + '');
      if (targetIndex < 0) return msgs;

      const newMsgs = [...msgs];
      newMsgs.splice(targetIndex, 1);

      return newMsgs;
    });
  };

  // const getMessages = async () => {
  //   const messages = await fetcher('get', '/messages');
  //
  //   setMsgs(messages);
  // };
  //
  // useEffect(() => {
  //   // getMessages();
  // }, []);

  return (
    <>
      <MsgInput mutate={onCreate} />
      <ul className="messages">
        {msgs.map((msg, i) => (
          <MsgItem
            key={i}
            onUpdate={onUpdate}
            onDelete={() => onDelete(msg.id)}
            startEdit={() => setEditingId(msg.id)}
            isEditing={editingId === msg.id}
            currentUserId={userId}
            user={susers[msg.userId]}
            {...msg}
          />
        ))}
      </ul>
    </>
  );
};

export default MsgList;
