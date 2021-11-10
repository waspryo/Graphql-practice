const { db } = require("../db");
const products = db.products;
const categories = db.categories;
exports.Query = {
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
};
