const Joi = require('joi');

const id = Joi.number(),
      firstName = Joi.string(),
      lastName = Joi.string(),
      dateOfBirth = Joi.date(),
      gender = Joi.string()

const createCustomer = Joi.object({
  firstName: firstName.required(),
  lastName,
  dateOfBirth,
  gender
});

const updateCsutomer = Joi.object({
  firstName,
  lastName,
  dateOfBirth,
  gender
});

const getCustomer = Joi.object({
  id: id.required(),
});

const deleteCustomer = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomer,
  updateCsutomer,
  getCustomer,
  deleteCustomer
}
