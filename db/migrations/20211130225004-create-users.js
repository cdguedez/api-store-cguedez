'use strict'

const { USERS_TABLE, UserSchema } = require('../models/user.model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USERS_TABLE, {
      id: UserSchema.id,
      email: UserSchema.email,
      userName: UserSchema.userName,
      password: UserSchema.password,
      createdAt: UserSchema.createdAt,
      updatedAt: UserSchema.updatedAt,
    }, {
      collate: 'utf8_unicode_ci'
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USERS_TABLE)
  }
}
