import express from "express";
import bodyParser from "body-parser";
import pg, { Client } from 'pg'
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); 
const port = 5001;

const db = new pg.Client({
  user: 'postgres',
  host : 'localhost',
  database : 'users',
  password : 'rohang@87*',
  port : 5432
})

db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/user/NewTrip", async (req, res) => {

   try{
     const {
      userName,
      title,
      Traveller_Destination,
      tripType,
      adults,
      budget,
      checkin_date,
      checkout_date
      } = req.body;

    const userRes = await db.query(
      "INSERT INTO users_info(name) VALUES ($1) RETURNING *",
      [userName]
    );  

    const userId = userRes.rows[0].id;

    const tripRes = await db.query(
      `INSERT INTO trip_form_info 
       (user_id, description, destination, start_date, end_date, budget, num_adults)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [userId, tripType, Traveller_Destination, checkin_date, checkout_date, budget, adults]
    );
    res.json({ message: "Trip saved successfully", tripId: tripRes.rows[0].id });
   }catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }


});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
