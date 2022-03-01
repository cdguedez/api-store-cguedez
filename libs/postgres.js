const { Pool } = require('pg'),
      config = require('../config/config'),
      USER = encodeURIComponent(config.dbUser),
      PASSWORD = encodeURIComponent(config.dbPass),
      URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`


const pool = new Pool({ connectionString: URI })

module.exports = pool
