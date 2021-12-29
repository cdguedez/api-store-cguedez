const boom = require('@hapi/boom'),
      { models } = require('../libs/sequelize');

class UsersService {

  constructor() {
    this.users = [];
    this.type = "users";
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser
  }

  async find() {
    const users = await models.User.findAll({ include: ['customer'] });
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, data) {
    const updateUser = await this.findOne(id);
    await updateUser.update(data);
    return updateUser;
  }

  async destroy(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return id;
  }

}

module.exports = UsersService;
