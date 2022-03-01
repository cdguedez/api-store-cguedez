const boom = require('@hapi/boom'),
      config = require('./../config/config')

class Auth {
  static checkApiKey(req, res, next) {
    const apiKey = req.headers['api']
    if (!apiKey) { return next(boom.unauthorized('apiKey required')) }
    if (apiKey !== config.apiKey) { return next(boom.unauthorized('Unauthorized')) }
    return next()
  }
}

module.exports = Auth
