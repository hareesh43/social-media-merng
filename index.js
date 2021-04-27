const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB } = require("./config");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const PORT = process.env.PORT || 3000
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`server is listening on ${res.url}`);
  })
  .catch((error) => {
    console.log(error);
  });
