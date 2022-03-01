const boom = require('@hapi/boom'),
      { models } = require('../libs/sequelize')
class CategoryService {

  constructor() {
    this.categories = []
    this.type = "categories"
  }

  async create(data) {
    const newCategory = await models.Category.create(data)
    return newCategory
  }

  async find() {
    const categories = await models.Category.findAll()
    return categories
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, { include: ['products'] })
    if(!category) {
      throw boom.notFound('Category not found')
    }
    return category
  }

  async update(id, data) {
    const updateCategory = await this.findOne(id)
    updateCategory.update(data)
    return updateCategory
  }

  async destroy(id) {
    const category = await this.findOne(id)
    category.destroy()
    return id
  }

}

module.exports = CategoryService
