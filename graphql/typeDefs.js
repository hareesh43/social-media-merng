const gql = require("graphql-tag");

module.exports = gql`
  type Posts {
    id: ID!
    username: String!
    createdAt: String!
    body: String!
  }

  type Query {
    getPosts: [Posts]
  }
`;
