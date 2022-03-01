'use strict'

const { USERS_TABLE, UserSchema } = require('../models/user.model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(USERS_TABLE, 'role', UserSchema.role)
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USERS_TABLE, 'role')
  }
}
