const { Strategy } = require('passport-local'),
      bcrypt = require('bcrypt'),
      userService = require('./../../../services/users.service'),
      boom = require('@hapi/boom'),
      service = new userService()

const LocalStrategy = new Strategy({
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email)
      const isMatch = await bcrypt.compare(password, user.dataValues.password)
      if (!isMatch) {
        throw boom.unauthorized('unauthorized')
      }
      delete user.dataValues.password
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  }
)

module.exports = LocalStrategy
