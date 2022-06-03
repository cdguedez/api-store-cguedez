const Joi = require('joi')

const id = Joi.number().integer(),
      userId = Joi.number().integer(),
      firstName = Joi.string(),
      lastName = Joi.string(),
      dateOfBirth = Joi.date(),
      gender = Joi.string(),
      email = Joi.string().email(),
      userName = Joi.string().min(5).max(20),
      password = Joi.string().min(8)

const createCustomer = Joi.object({
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

const updateCsutomer = Joi.object({
  userId: userId.required(),
  firstName,
  lastName,
  dateOfBirth,
  gender
})

const getCustomer = Joi.object({
  id: id.required(),
})

const deleteCustomer = Joi.object({
  id: id.required(),
})

module.exports = {
  createCustomer,
  updateCsutomer,
  getCustomer,
  deleteCustomer
}
