const { db } = require("../db");
const products = db.products;
exports.Category = {
  products: (parent, args, context) => {
    const categoryId = parent.id;
    return products.filter((product) => product.categoryId === categoryId);
  },
};
