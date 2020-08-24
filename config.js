require("dotenv").config();

const pkg = require("./package.json");
const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

module.exports = {
  dialect: "postgres",
  logging: false,
  host: process.env.DATABASE_URL,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  port: '5432',
  database: databaseName
}

