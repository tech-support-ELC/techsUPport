const pkg = require('./package.json')
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')
if (process.env.NODE_ENV !== 'production') require('./dbSecrets')

module.exports = {
  dialect: process.env.DIALECT,
  logging: false,
  host: process.env.DATABASE_URL,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  port: process.env.PORT,
  database: databaseName
}
