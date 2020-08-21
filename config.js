const pkg = require('./package.json')
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

module.exports = {
  dialect: 'postgres',
  logging: false,
  host: process.env.DATABASE_URL || 'capstone.c3dxjld76vva.us-east-1.rds.amazonaws.com',
  password: process.env.DB_PASSWORD || 'capstoneTeam#1',
  username: process.env.DB_USERNAME || 'capstone',
  port: '5432',
  database: databaseName
}
