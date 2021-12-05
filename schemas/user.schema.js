const joi = require('joi')

const id = joi.number(),
      email = joi.string().email(),
      userName = joi.string().min(5).max(20),
      password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      role = joi.string().min(5);

const createUser = joi.object({
  email: email.required(),
  userName: userName.required(),
  password: password.required(),
  role
});

const updateUser = joi.object({
  userName,
  email,
  password,
  role
});

const getUser = joi.object({
  id: id.required(),
});

const deleteUser = joi.object({
  id: id.required(),
});

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
}
