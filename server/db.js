// server/db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // load environment variables from .env

const { Pool } = pkg;

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Simple helper function to query the database
export const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  }
};

// Optional: test connection immediately
pool.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Database connection error:", err));
