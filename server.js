require('dotenv').config();
const { createApp } = require('./app');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

const PORT = process.env.PORT || 3000;
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 4000;

(async () => {
  const app = await createApp();

  // Subir REST (porta 3000)
  app.listen(PORT, () => {
    const rest = process.env.BASE_URL_REST || `http://localhost:${PORT}`;
    console.log(`✅ REST rodando em ${rest}`);
  });

  // Subir GraphQL (porta 4000)
  const express = require('express');
  const gqlApp = express();

  gqlApp.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  gqlApp.listen(GRAPHQL_PORT, () => {
    const gql = process.env.BASE_URL_GRAPHQL || `http://localhost:${GRAPHQL_PORT}/graphql`;
    console.log(`🚀 GraphQL rodando em ${gql}`);
  });
})();
