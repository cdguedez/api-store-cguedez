const faker = require('faker'),
      boom = require('@hapi/boom'),
      pool = require('../libs/postgres');

class UsersService {

  constructor() {
    this.users = [];
    this.type = "users";
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err))
  }

  generate() {
    const limit = 5;
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

  async create(data) {
    const id = faker.datatype.uuid()
    const newUser = {
      type: this.type,
      id,
      attributes: data
    }
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    // if(this.users.length === 0) {
    //   throw boom.notFound('Not exist users')
    // }
    // return this.users;
    // const client = await getConnect();
    // const res = await client.query('SELECT * from tasks');
    // return res.rows;
    const query = 'SELECT * FROM tasks';
    const res = await this.pool.query(query);
    return res.rows;
  }

  async findOne(id) {
    const user = this.users.find(item => item.id === id);
    if(!user) {
      throw boom.notFound('User not found')
    }
    return user;
  }

  async update(id, data) {
    const indexUser = this.users.findIndex(item => item.id === id);
    if(indexUser === -1) {
      throw boom.notFound('User not found')
    }
    const attributes = this.users[indexUser].attributes;
    this.users[indexUser].attributes = {
      ...attributes,
      ...data
    }
    return this.users[indexUser];
  }

  async destroy(id) {
    const indexUser = this.users.findIndex(item => item.id === id);
    if(indexUser === -1) {
      throw boom.notFound('User not found')
    }
    this.users.splice(indexUser, 1);
    return id;
  }

}

module.exports = UsersService;
