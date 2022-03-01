'use strict'

const { PRODUCTS_TABLE, ProductSchema } = require('../models/product.model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PRODUCTS_TABLE, {
      id: ProductSchema.id,
      name: ProductSchema.name,
      price: ProductSchema.price,
      description: ProductSchema.description,
      categoryId: ProductSchema.categoryId,
      createdAt: ProductSchema.createdAt,
      updatedAt: ProductSchema.updatedAt
    }, {
      collate: 'utf8_unicode_ci'
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PRODUCTS_TABLE)
  }
}
