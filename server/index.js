import express from 'express';
import cors from 'cors';
// credentails
import dotenv from 'dotenv';
// database
import { query } from './db.js';
// authentication
import session from 'express-session';
import passport from 'passport';

// extracting all the .env varibles
dotenv.config();
// instance of an express app
const app = express();

// Enable CORS for all origins (adjust for production!)
app.use(cors());

// Parse JSON bodies
app.use(express.json());



// Basic health check route to test server & DB connection
app.get('/health', async (req, res) => {
  try {
    // Run a simple query on PostgreSQL to check connectivity
    const dbResponse = await query('SELECT NOW()');
    res.status(200).json({
      status: 'OK',
      serverTime: new Date().toISOString(),
      dbTime: dbResponse.rows[0].now,
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ status: 'Error connecting to database' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
