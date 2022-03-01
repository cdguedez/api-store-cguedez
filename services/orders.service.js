const boom = require('@hapi/boom'),
      { models } = require('../libs/sequelize')


class OrderService {

  constructor() {
    this.products = []
    this.type = "orders"
  }

  async create(data) {
    const newOrder = await models.Order.create(data)
    return newOrder
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data)
    return newItem
  }

  async find() {
    const orders = await models.Order.findAll()
    return orders
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, { include: [
      { association: 'customer', include: ['user'] },
      'items'
    ] })
    if(!order) {
      throw boom.notFound('Order not found')
    }
    return order
  }

  async update(id, data) {
    const updateOrder = await this.findOne(id)
    updateOrder.update(data)
    return updateOrder
  }

  async destroy(id) {
    const order = await this.findOne(id)
    order.destroy()
    return id
  }

}

module.exports = OrderService
