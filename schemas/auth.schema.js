const Joi = require('joi')

const email = Joi.string().email(),
userName = Joi.string().min(5).max(20),
password = Joi.string().min(8)

const login = Joi.object({
  email: email.required(),
  password: password.required()
})

const register = Joi.object({
  email: email.required(),
  userName: userName.required(),
  password: password.required(),
})

const recovery = Joi.object({
  email: email.required()
})

module.exports = { login, register, recovery }
