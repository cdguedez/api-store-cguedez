const { Sequelize } = require('sequelize'),
      config = require('../config/config'),
      setupModels = require('./../db/models'),
      USER = encodeURIComponent(config.dbUser),
      PASSWORD = encodeURIComponent(config.dbPass),
      URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true
});

setupModels(sequelize);
sequelize.sync();
module.exports = sequelize;
