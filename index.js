const { ApolloServer } = require("apollo-server");
const { db } = require("./db.js");
const { typeDefs } = require("./schema.js");

const products = db.products;
const categories = db.categories;

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
