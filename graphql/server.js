
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const root = require('./resolvers');

const app = express();
app.use(express.json());

app.use('/graphql', (req,res)=> {
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
    context: req
  })(req,res);
});

const PORT = process.env.GRAPHQL_PORT || 4000;
app.listen(PORT, ()=>console.log(`GraphQL at http://localhost:${PORT}/graphql`));
