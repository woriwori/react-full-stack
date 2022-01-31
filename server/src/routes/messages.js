import { v4 } from "uuid";
import { writeDB, readDB } from "../dbController.js";

const getMessages = () => readDB("messages");
const setMessages = (data) => writeDB("messages", data);

const messagesRoute = [
  {
    // GET message list
    method: "get",
    route: "/messages",
    handler(req, res) {
      const msgs = getMessages();
      res.send(msgs);
    },
  },
  {
    // GET message
    method: "get",
    route: "/messages/:id",
    handler({ params: { id } }, res) {
      try {
        const msgs = getMessages();
        const msg = msgs.find((msg) => msg.id === id);
        if (!msg) throw Error("메시지가 없습니다.");

        res.send(msg);
      } catch (e) {
        res.status(404).send({ error: e });
      }
    },
  },
  {
    // POST message
    method: "post",
    route: "/messages",
    handler({ body }, res) {
      const msgs = getMessages();
      const newMsg = {
        id: v4(),
        text: body.text,
        userId: body.userId,
        timestamp: Date.now(),
      };
      msgs.unshift(newMsg);
      setMessages(msgs);
      res.send(newMsg);
    },
  },
  {
    // PUT message
    method: "put",
    route: "/messages/:id",
    handler({ body, params: { id } }, res) {
      try {
        const msgs = getMessages();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메시지가 없습니다.";
        if (msgs[targetIndex].userId !== body.userId)
          throw "사용자가 다릅니다.";

        const newMsg = { ...msgs[targetIndex], text: body.text };
        msgs.splice(targetIndex, 1, newMsg);
        setMessages(msgs);
        res.send(newMsg);
      } catch (e) {
        res.status(500).send({ error: e });
      }
    },
  },
  {
    // DELETE message
    method: "delete",
    route: "/messages/:id",
    handler({ body, params: { id }, query: { userId } }, res) {
      try {
        const msgs = getMessages();
        const targetIndex = msgs.findIndex((msg) => msg.id === id);
        if (targetIndex < 0) throw "메시지가 없습니다.";
        if (msgs[targetIndex].userId !== userId) throw "사용자가 다릅니다.";

        msgs.splice(targetIndex, 1);
        setMessages(msgs);
        res.send(id);
      } catch (e) {
        res.status(500).send({ error: e });
      }
    },
  },
];

export default messagesRoute;
