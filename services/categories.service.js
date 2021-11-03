const faker = require('faker');

class CategoryService {

  constructor() {
    this.categories = [];
    this.type = "categories";
    this.generate();
  }

  generate() {
    const limit = 100;
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

  create(data) {
    const id = faker.datatype.uuid();
    const newCategory = {
      type: this.type,
      id,
      attributes: data
    }
    this.categories.push(newCategory)
    return newCategory;
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    const category = this.categories.find(item => item.id === id);
    return category;
  }

  update(id, data) {
    const indexCategory = this.categories.findIndex(item => item.id === id);
    if(indexCategory === -1) {
      throw new Error('Category not found');
    }
    const attributes = this.categories[indexCategory].attributes;
    this.categories[indexCategory].attributes = {
      ...attributes,
      ...data
    }
    return this.categories[indexCategory];
  }

  destroy(id) {
    const indexCategory = this.categories.findIndex(item => item.id === id);
    if(indexCategory === -1) {
      throw new Error('Category not found');
    }
    this.categories.splice(indexCategory, 1);
    return id;
  }

}

module.exports = CategoryService;
