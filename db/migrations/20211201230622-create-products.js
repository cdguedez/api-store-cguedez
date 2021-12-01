'use strict';

const { PRODUCTS_TABLE, ProductSchema } = require('../models/product.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PRODUCTS_TABLE, {
      id: ProductSchema.id,
      name: ProductSchema.name,
      description: ProductSchema.description,
      createdAt: ProductSchema.createdAt,
      updatedAt: ProductSchema.updatedAt
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PRODUCTS_TABLE)
  }
};
