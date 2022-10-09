const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(
  process.env.RAILWAY_ENVIRONMENT === "production" ? prodConfig : devConfig
);

module.exports = pool;
