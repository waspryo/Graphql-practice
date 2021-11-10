const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String!
    numberOfAnimals: Int
    price: Float
    isCool: Boolean
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return null;
    },
    numberOfAnimals: () => {
      return 55;
    },
    price: () => {
      return 21545.85643;
    },
    isCool: () => {
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log("Server is ready at " + url);
});
