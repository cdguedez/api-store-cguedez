const boom = require('@hapi/boom'),
      { models } = require('../libs/sequelize');


class ProductService {

  constructor() {
    this.products = [];
    this.type = "products";
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const products = await models.Product.findAll({ include: ['category'] });
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if(!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, data) {
    const updateProduct = await this.findOne(id);
    updateProduct.update(data);
    return updateProduct;
  }

  async destroy(id) {
    const product = await this.findOne(id);
    product.destroy();
    return id;
  }

}

module.exports = ProductService;
