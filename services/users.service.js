const boom = require('@hapi/boom'),
      bcrypt = require('bcrypt'),
      { models } = require('../libs/sequelize'),
      { Customer } = require('../db/models/customer.model')

class UsersService {

  constructor() {
    this.users = []
    this.type = "users"
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10)
    const newUser = await models.User.create({
      ...data,
      password: hash
    })
    delete newUser.dataValues.password
    return newUser
  }

  async find() {
    const users = await models.User.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: {
        model: Customer, as: 'customer',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    })
    return users
  }

  async findOne(id) {
    const user = await models.User.findOne({
      where: { id },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: { model: Customer, as: 'customer', attributes: { exclude: ['createdAt', 'updatedAt'] } },
    })
    if(!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    return user
  }

  async update(id, data) {
    const updateUser = await this.findOne(id)
    await updateUser.update(data)
    return updateUser
  }

  async destroy(id) {
    const user = await this.findOne(id)
    await user.destroy()
    return id
  }

}

module.exports = UsersService
