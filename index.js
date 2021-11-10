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
  }
  type Category {
    id: ID!
    name: String!
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
    categories: () => {
      return categories;
    },
    category: (parent, args, context) => {
      const categoryId = args.id;
      const category = categories.find(
        (category) => category.id === categoryId
      );
      if (!category) return null;
      return category;
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
