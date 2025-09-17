const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const resolvers = require('./resolvers');
const playground = require('graphql-playground-middleware-express').default;

const app = express();

// endpoint principal GraphQL (sem interface gráfica)
app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    rootValue: resolvers,
    context: req, // 🔑 headers chegam nos resolvers
    graphiql: false // desabilita GraphiQL padrão
  }))
);

// endpoint para abrir o Playground
app.get('/playground', playground({ endpoint: '/graphql' }));

const PORT = process.env.GRAPHQL_PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 GraphQL API em http://localhost:${PORT}/graphql`);
  console.log(`🛠️ Playground em http://localhost:${PORT}/playground`);
});
