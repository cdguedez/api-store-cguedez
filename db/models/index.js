const { User, UserSchema } = require('./user.model'),
      { Category, CategorySchema } = require('./category.model'),
      { Product, ProductSchema } = require('./product.model'),
      { Customer, CustomerSchema } = require('./customer.model'),
      { Order, OrderSchema } = require('./order.model'),
      { OrderProduct, OrderProductSchema } = require('./order-product.model')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  Order.init(OrderSchema, Order.config(sequelize))
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize))

  Customer.associate(sequelize.models)
  User.associate(sequelize.models)
  Product.associate(sequelize.models)
  Category.associate(sequelize.models)
  Order.associate(sequelize.models)
}

module.exports = setupModels
