const boom = require('@hapi/boom'),
      bcrypt = require('bcrypt'),
      { models } = require('../libs/sequelize')

class CustomersService {

  constructor() {
    this.customers = []
    this.type = "customers"
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10)
    const newCustomer = await models.Customer.create({
      ...data,
      user: { ...data.user,  password: hash }
    }, { include: ['user'] })
    delete newCustomer.dataValues.user.dataValues.password
    return newCustomer
  }

  async find() {
    const customers = await models.Customer.findAll()
    return customers
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, { include: ['user', 'orders'] })
    if(!customer) {
      throw boom.notFound('Customer not found')
    }
    return customer
  }

  async update(id, data) {
    const updateCustomer = await this.findOne(id)
    await updateCustomer.update(data)
    return updateCustomer
  }

  async destroy(id) {
    const customer = await this.findOne(id)
    await customer.destroy()
    return id
  }

}

module.exports = CustomersService
