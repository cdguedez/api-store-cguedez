const joi = require('joi')

const id = joi.number(),
      email = joi.string().email(),
      userName = joi.string().min(5).max(20),
      password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));

const createUser = joi.object({
  email: email.required(),
  userName: userName.required(),
  password: password.required(),
});

const updateUser = joi.object({
  userName,
  email,
  password,
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
