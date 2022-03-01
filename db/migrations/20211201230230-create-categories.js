'use strict'

const { CATEGORIES_TABLE, CategorySchema } = require('../models/category.model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CATEGORIES_TABLE, {
      id: CategorySchema.id,
      name: CategorySchema.name,
      description: CategorySchema.description,
      createdAt: CategorySchema.createdAt,
      updatedAt: CategorySchema.updatedAt
    }, {
      collate: 'utf8_unicode_ci'
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CATEGORIES_TABLE)
  }
}
