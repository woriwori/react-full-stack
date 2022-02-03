import { gql } from "apollo-server-express";
import messageSchema from "./messages.js";
import userSchema from "./users.js";

// default 타입을 만들어놓고, messages/users에서 얘네들을 extend해서 사용하도록함
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, messageSchema, userSchema];
