const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const cors = require("cors");
require("./dbconnect");

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

const transactionQuery = require("./graphql/transaction/query");
const transactionMutation = require("./graphql/transaction/mutation");
const cartQuery = require("./graphql/cart/query");
const cartMutation = require("./graphql/cart/mutation");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...cartQuery,
    ...transactionQuery,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...cartMutation,
    ...transactionMutation,
  },
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: new GraphQLSchema({
      query: Query,
      mutation: Mutation,
    }),
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
