const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { DEV_DATABASE_HOST, DEV_DATABASE_USERNAME, DEV_DATABASE_PASSWORD } =
  process.env;

module.exports = {
  development: {
    username: DEV_DATABASE_USERNAME,
    password: DEV_DATABASE_PASSWORD,
    database: "proxiiworld_development",
    host: DEV_DATABASE_HOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "proxiitest-db",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "proxiidb",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
