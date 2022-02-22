require('dotenv').config();
const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dialect: process.env.DB,
  dbUrl: process.env.CLEARDB_DATABASE_URL,
  apiKey: process.env.API_KEY,
}

module.exports = config;
