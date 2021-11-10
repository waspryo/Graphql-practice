const { ApolloServer, gql } = require("apollo-server");
const { db } = require("./db.js");

const products = db.products;
const categories = db.categories;

const typeDefs = gql`
  type Query {
    hello: String
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
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
    category: Category
  }
  type Category {
    id: ID!
    name: String!
    products: [Product!]!
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
      // const productId = args.id;
      const { id } = args;
      return products.find((product) => product.id === id);
    },
    categories: () => {
      return categories;
    },
    category: (parent, args, context) => {
      // const categoryId = args.id;
      const { id } = args;
      return categories.find((category) => category.id === id);
    },
  },
  Category: {
    products: (parent, args, context) => {
      const categoryId = parent.id;
      return products.filter((product) => product.categoryId === categoryId);
    },
  },
  Product: {
    category: (parent, args, context) => {
      const categoryId = parent.categoryId;
      return categories.find((category) => category.id === categoryId);
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
