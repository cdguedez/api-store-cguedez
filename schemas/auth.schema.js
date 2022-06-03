const Joi = require('joi')

const email = Joi.string().email()
const userName = Joi.string().min(5).max(20)
const password = Joi.string().min(8)
const firstName = Joi.string()
const lastName = Joi.string()
const dateOfBirth = Joi.date()
const gender = Joi.string()

const login = Joi.object({
  email: email.required(),
  password: password.required()
})

const register = Joi.object({
  firstName: firstName.required(),
  lastName,
  dateOfBirth,
  gender,
  /** With userId */
  // userId: userId.required()
  /**With user data */
  user: Joi.object({
    email: email.required(),
    userName: userName.required(),
    password: password.required()
  }).required()
})

const recovery = Joi.object({
  email: email.required()
})

module.exports = { login, register, recovery }
