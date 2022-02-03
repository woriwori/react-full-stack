// nodemon으로 실행하는 파일
// express를 띄우기 위한 모든걸 import 한다.
import express from "express";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers/index.js";
import schema from "./schema/index.js";
import { readDB } from "./dbController.js";
// import cors from "cors";
// import messagesRoute from "./routes/messages.js";
// import usersRoute from "./routes/users.js";

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// const routes = [...messagesRoute, ...usersRoute];
// routes.forEach(({ method, route, handler }) => {
//   app[method](route, handler);
// });

// 원래 express를 사용해서 routing 설정으로 요청을 보냈다면
// graphql로 요청을 보내면 resolver에서 처리를 해준다.
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    db: {
      messages: readDB("messages"),
      users: readDB("users"),
    },
  },
});

const app = express();
await server.start();
server.applyMiddleware({
  app,
  path: "/graphql",
  cors: {
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true,
  },
});

await app.listen({ port: 8000 });
console.log("server listening on 8000...");
/*
 * Cannot GET / 라고 뜨게 되면 /에 해당하는 라우팅 정보가 정의되어있지 않기 때문에 발생하는 에러
 * */
