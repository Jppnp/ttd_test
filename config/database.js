const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "db",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

const createTable = async () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS datas (
        id SERIAL PRIMARY KEY,
        data VARCHAR(255) NOT NULL
      );
    `;

  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    console.log("Table created successfully");
    client.release();
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

module.exports = {
  pool,
  createTable,
};
