const faker = require('faker')

class ProductService {

  constructor() {
    this.products = [];
    this.type = "products"
    this.generate()
  }

  generate() {
    const limit = 100;
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
    return
  }

  create(data) {
    const id = faker.datatype.uuid()
    const newProduct = {
      type: this.type,
      id,
      attributes: data
    }
    this.products.push(newProduct)
    return newProduct
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id === id);
  }
  update(id, data) {
    const indexProduct = this.products.findIndex(item => item.id === id);
    if(indexProduct === -1) {
      throw new Error('product not found')
    }
    const attributes = this.products[indexProduct].attributes;
    this.products[indexProduct].attributes = {
      ...attributes,
      ...data
    }
    return this.products[indexProduct];
  }

  destroy(id) {
    const indexProduct = this.products.findIndex(item => item.id === id);
    if(indexProduct === -1) {
      throw new Error('product not found')
    }
    this.products.splice(indexProduct, 1)
    return id
  }

}

module.exports = ProductService;
