const faker = require('faker'),
      boom = require('@hapi/boom');

class ProductService {

  constructor() {
    this.products = [];
    this.type = "products";
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        type: this.type,
        id: faker.datatype.uuid(),
        attributes: {
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          image: faker.image.imageUrl(),
          description: faker.lorem.sentence(),
        }
      })
    }
  }

  async create(data) {
    const id = faker.datatype.uuid()
    const newProduct = {
      type: this.type,
      id,
      attributes: data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    if(this.products.length === 0) {
      throw boom.notFound('not exist products')
    }
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if(!product) {
      throw boom.notFound('product not found')
    }
    return product;
  }

  async update(id, data) {
    const indexProduct = this.products.findIndex(item => item.id === id);
    if(indexProduct === -1) {
      throw boom.notFound('product not found')
    }
    const attributes = this.products[indexProduct].attributes;
    this.products[indexProduct].attributes = {
      ...attributes,
      ...data
    }
    return this.products[indexProduct];
  }

  async destroy(id) {
    const indexProduct = this.products.findIndex(item => item.id === id);
    if(indexProduct === -1) {
      throw boom.notFound('product not found')
    }
    this.products.splice(indexProduct, 1);
    return id;
  }

}

module.exports = ProductService;
