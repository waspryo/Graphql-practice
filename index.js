const { ApolloServer, gql } = require("apollo-server");
const { db } = require("./db.js");

const products = db.products;

const typeDefs = gql`
  type Query {
    hello: String
    products: [Product!]!
    product(id: ID!): Product
  }
  type Product {
    id: String!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    categoryId: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "hello";
    },
    products: () => {
      return products;
    },
    product: (parent, args, context) => {
      const productId = args.id;
      const product = products.find((product) => product.id === productId);
      if (!product) return null;
      return product;
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
