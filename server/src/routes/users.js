import { readDB } from "../dbController.js";

const getUsers = () => readDB("users");

const usersRoute = [
  {
    // GET user list
    method: "get",
    route: "/users",
    handler(req, res) {
      const users = getUsers();
      res.send(users);
    },
  },
  {
    // GET user
    method: "get",
    route: "/users/:id",
    handler({ params: { id } }, res) {
      try {
        const users = getUsers();
        const user = users[id];
        if (!user) throw Error("사용자가 없습니다.");

        res.send(user);
      } catch (e) {
        res.status(404).send({ error: e });
      }
    },
  },
];

export default usersRoute;
