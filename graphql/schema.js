const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    id: ID!
    username: String!
  }

  type Compra {
    id: ID!
    titulo: String!
    status: String!
    date: String!
  }

  input CompraInput {
    titulo: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    users: [User]
    myCompras: [Compra]
  }

  type Mutation {
    register(username: String!, password: String!): User
    login(username: String!, password: String!): Auth
    comprarLivro(input: CompraInput!): Compra
  }
`);
