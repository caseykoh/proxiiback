const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Postpatago99",
  host: "localhost",
  port: 5432,
  database: "proxiiworld_db",
});

module.exports = pool;
