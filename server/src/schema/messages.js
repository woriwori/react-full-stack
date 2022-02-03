import { gql } from "apollo-server-express";

// gql : graphql 의 약자. template literal 문자열을 자바스크립트 언어로 치환해줌

const messageSchema = gql`
  type Message {
    id: ID!
    text: String!
    userId: ID!
    timestamp: Float #13자리 숫자
  }

  # GET
  extend type Query {
    messages: [Message!]! # getMessages
    message(id: ID!): Message! # getMessage by ID
  }

  # POST, PUT, DELTE
  extend type Mutation {
    createMessage(text: String!, userId: ID!): Message!
    updateMessage(id: ID!, text: String!, userId: ID!): Message!
    deleteMessage(id: ID!, userId: ID!): ID!
  }
`;

export default messageSchema;
