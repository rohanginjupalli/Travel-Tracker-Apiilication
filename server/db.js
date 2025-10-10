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

      // enter the user into the database

    const userRes = await db.query(
      "INSERT INTO users_info(name) VALUES ($1) RETURNING *",
      [userName]
    );  

    const userId = userRes.rows[0].id;

    // entering the form data into the database

    const tripRes = await db.query(
      `INSERT INTO trip_form_info 
       (user_id, description, destination, start_date, end_date, budget, num_adults)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [userId, tripType, Traveller_Destination, checkin_date, checkout_date, budget, adults]
    );
    const tripId = tripRes.rows[0].id;
    res.json({message:"Sucessfully user info have be saved in the database",tripId})
   }catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/user/NewTrip/apidata", async (req, res) => {

  // storing data into weather table 
  try {
    const weatherResponse = await db.query(
      `INSERT INTO weather_info (trip_id,temp_celsius)
       VALUES ($1, $2) RETURNING id`,
      [req.body.trip_id, req.body.temp_celsius]
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error inserting weather info" });
  }

  // storing data into the hotels table

  try {
  
    const hotels = req.body.hotels

    if (hotels && hotels.length > 0) {
      for (const hotel of hotels) {
        const name = hotel.name || "Unknown Hotel";
        const price = hotel.rate_per_night?.extracted_lowest || 0;
        const amenities = hotel.amenities || [];

        await db.query(
          `INSERT INTO hotels (trip_id, name, price, amenities)
           VALUES ($1, $2, $3, $4)`,
          [req.body.trip_id, name, price, amenities]
        );
      }
      console.log(`Saved ${hotels.length} hotels for trip ${req.body.trip_id}`);
    }

  } catch (error) {
    console.error("Database error inserting weather/hotels info:", error);
    res.status(500).json({ error: "Database error inserting weather/hotels info" });
  }

  
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
