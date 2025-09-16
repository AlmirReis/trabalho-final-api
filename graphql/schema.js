
const { buildSchema } = require('graphql');
module.exports = buildSchema(`
  type User { id: ID!, username: String! }
  type Compra { id: ID!, userId: ID!, title: String!, date: String! }

  type LoginResult { token: String!, user: User! }

  type Query {
    users: [User!]!
    compras: [Compra!]!
  }

  type Mutation {
    register(username:String!, password:String!): User!
    login(username:String!, password:String!): LoginResult!
    comprar(title:String!): Compra!
  }
`);
