const boom = require('@hapi/boom'),
      { Op } = require('sequelize'),
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

  async find(query) {
    const { limit, offset, price, price_min, price_max } = query;
    const options = {
      limit: 5,
      offset: 0,
      where: {}
    }
    if(limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }
    if(price) {
      options.where.price = parseInt(price)
    }
    if(price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, { include: ['category'] });
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
