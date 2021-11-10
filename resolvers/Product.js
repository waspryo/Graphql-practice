const { db } = require("../db");
const categories = db.categories;
exports.Product = {
  category: (parent, args, context) => {
    const categoryId = parent.categoryId;
    return categories.find((category) => category.id === categoryId);
  },
};
