const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "mellon",
    host: "localhost",
    port: 5432,
    database: "questboard"
});

module.exports = pool;
