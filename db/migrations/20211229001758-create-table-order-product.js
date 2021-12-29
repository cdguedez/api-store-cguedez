'use strict';

const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('../models/order-product.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: OrderProductSchema.id,
      orderId: OrderProductSchema.orderId,
      productId: OrderProductSchema.productId,
      amount: OrderProductSchema.amount,
      createdAt: OrderProductSchema.createdAt,
      updatedAt: OrderProductSchema.updatedAt,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE)
  }
};
