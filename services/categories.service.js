const faker = require('faker'),
      boom = require('@hapi/boom')
class CategoryService {

  constructor() {
    this.categories = [];
    this.type = "categories";
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        type: this.type,
        id: faker.datatype.uuid(),
        attributes: {
          name: faker.name.jobArea(),
          description: faker.lorem.sentence()
        }
      });
    }
  }

  async create(data) {
    const id = faker.datatype.uuid();
    const newCategory = {
      type: this.type,
      id,
      attributes: data
    }
    this.categories.push(newCategory)
    return newCategory;
  }

  async find() {
    if(this.categories.length === 0) {
      throw boom.notFound('Not exist categories')
    }
    return this.categories;
  }

  async findOne(id) {
    const category = this.categories.find(item => item.id === id);
    if(!category) {
      throw boom.notFound('Category not found')
    }
    return category;
  }

  async update(id, data) {
    const indexCategory = this.categories.findIndex(item => item.id === id);
    if(indexCategory === -1) {
      throw boom.notFound('Category not found')
    }
    const attributes = this.categories[indexCategory].attributes;
    this.categories[indexCategory].attributes = {
      ...attributes,
      ...data
    }
    return this.categories[indexCategory];
  }

  async destroy(id) {
    const indexCategory = this.categories.findIndex(item => item.id === id);
    if(indexCategory === -1) {
      throw boom.notFound('Category not found')
    }
    this.categories.splice(indexCategory, 1);
    return id;
  }

}

module.exports = CategoryService;
