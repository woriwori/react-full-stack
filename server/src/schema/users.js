import { gql } from "apollo-server-express";

// gql : graphql 의 약자. template literal 문자열을 자바스크립트 언어로 치환해줌

const userSchema = gql`
  type User {
    id: ID!
    nickname: String!
  }

  # GET
  extend type Query {
    users: [User!]! # getMessages
    user(id: ID!): User! # getMessage by ID
  }
`;

export default userSchema;
