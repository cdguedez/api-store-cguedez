'use strict'

const { CUSTOMERS_TABLE, CustomerSchema } = require('../models/customer.model')
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CUSTOMERS_TABLE, {
      id: CustomerSchema.id,
      firstName: CustomerSchema.firstName,
      lastName: CustomerSchema.lastName,
      dateOfBirth: CustomerSchema.dateOfBirth,
      gender: CustomerSchema.gender,
      userId: CustomerSchema.userId,
      createdAt: CustomerSchema.createdAt,
      updatedAt: CustomerSchema.updatedAt
    }, {
      collate: 'utf8_unicode_ci'
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CUSTOMERS_TABLE)
  }
}
