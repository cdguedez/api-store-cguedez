'use strict'

const { USERS_TABLE, UserSchema } = require('./../models/user.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USERS_TABLE, 'recovery_token', UserSchema.recoveryToken)
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USERS_TABLE, 'recovery_token')
  }
}
