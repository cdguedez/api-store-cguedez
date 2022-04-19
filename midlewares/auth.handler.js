const boom = require('@hapi/boom'),
      config = require('./../config/config')

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api']
  if (!apiKey) { return next(boom.unauthorized('apiKey required')) }
  if (apiKey !== config.apiKey) { return next(boom.unauthorized('Unauthorized')) }
  return next()
}


function checkRole(...role) {
  return (req, res, next) => {
    const user = req.user
    if (!user) { return next(boom.unauthorized('Unauthorized')) }
    if (!role.includes(user.role)) { return next(boom.unauthorized('Unauthorized')) }
    return next()
  }
}

module.exports = { checkApiKey, checkRole }
