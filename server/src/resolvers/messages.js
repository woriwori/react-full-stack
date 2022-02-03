// router에서 messages가 하던 역할을 그대로한다
// readDB는 필요없다. context로 할수 있다.
import { v4 } from "uuid";
import { writeDB } from "../dbController.js";

/*
 * obj: parent 객체. 거의 사용 안함
 * args: Query 에 필요한 필드에 제공되는 paarams
 * context: 로그인한 사용자. DB Access등 중요한 정보들
 *
 * */
const setMessages = (data) => writeDB("messages", data);
const messageResolver = {
  Query: {
    messages: (parentObj, args, { db }) => {
      return db.messages;
    },
    message: (parentObj, { id = "" }, { db }) => {
      return db.messages.find((msg) => msg.id === id);
    },
  },
  Mutation: {
    createMessage(parentObj, { text, userId }, { db }) {
      const newMsg = {
        id: v4(),
        text,
        userId,
        timestamp: Date.now(),
      };
      db.messages.unshift(newMsg);
      setMessages(db.messages);
      return newMsg;
    },
    updateMessage(parentObj, { id, text, userId }, { db }) {
      // try {
      const targetIndex = db.messages.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) throw "메시지가 없습니다.";
      if (db.messages[targetIndex].userId !== userId)
        throw "사용자가 다릅니다.";

      const newMsg = { ...db.messages[targetIndex], text };
      db.messages.splice(targetIndex, 1, newMsg);
      setMessages(db.messages);

      return newMsg;
      // } catch (e) {
      //   res.status(500).send({ error: e });
      // }
    },
    deleteMessage(parentObj, { id, userId }, { db }) {
      // try {
      const targetIndex = db.messages.findIndex((msg) => msg.id === id);
      if (targetIndex < 0) throw "메시지가 없습니다.";
      if (db.messages[targetIndex].userId !== userId)
        throw "사용자가 다릅니다.";

      db.messages.splice(targetIndex, 1);
      setMessages(db.messages);
      return id;
      // } catch (e) {
      //     res.status(500).send({ error: e });
      // }
    },
  },
};

export default messageResolver;
