const joi = require('joi')

const id = joi.string().uuid(),
      firstName = joi.string().min(2).max(30),
      lastName = joi.string().min(2).max(30),
      role = joi.string().valid('admin', 'user'),
      phone = joi.number().integer().min(1000000000).max(9999999999);

const createUser = joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  role: role.required(),
  phone
});

const updateUser = joi.object({
  firstName,
  lastName,
  role,
  phone
});

const getUser = joi.object({
  id: id.required()
});

const deleteUser = joi.object({
  id: id.required()
});

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser
}
