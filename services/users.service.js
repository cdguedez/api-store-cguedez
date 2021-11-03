const faker = require('faker')

class UsersService {

  constructor() {
    this.users = [];
    this.type = "users";
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        type: this.type,
        id: faker.datatype.uuid(),
        attributes: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          role: faker.name.jobTitle(),
          phone: faker.phone.phoneNumber()
        }
      })
    }
  }

  create(data) {
    const id = faker.datatype.uuid()
    const newUser = {
      type: this.type,
      id,
      attributes: data
    }
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    const user = this.users.find(item => item.id === id);
    return user;
  }

  update(id, data) {
    const indexUser = this.users.findIndex(item => item.id === id);
    if(indexUser === -1) {
      throw new Error('User not found')
    }
    const attributes = this.users[indexUser].attributes;
    this.users[indexUser].attributes = {
      ...attributes,
      ...data
    }
    return this.users[indexUser];
  }

  destroy(id) {
    const indexUser = this.users.findIndex(item => item.id === id);
    if(indexUser === -1) {
      throw new Error('User not found')
    }
    this.users.splice(indexUser, 1);
    return id;
  }

}

module.exports = UsersService;
