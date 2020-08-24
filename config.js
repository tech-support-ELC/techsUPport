const pkg = require('./package.json')
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
if (process.env.NODE_ENV !== 'production') require('./dbSecrets')

module.exports = {
  dialect: 'postgres',
  logging: false,
  host: process.env.DATABASE_URL,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  port: '5432',
  database: databaseName
}
