'use strict'

const { ORDERS_TABLE, OrderSchema } = require('../models/order.model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDERS_TABLE, {
      id: OrderSchema.id,
      customerId: OrderSchema.customerId,
      status: OrderSchema.status,
      createdAt: OrderSchema.createdAt,
      updatedAt: OrderSchema.updatedAt,
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDERS_TABLE)
  }
}
