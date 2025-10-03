import express from 'express';
import axios from 'axios'
import cors from 'cors';
// credentails
import dotenv from 'dotenv';
// database
import { query } from './db.js';
// authentication
import session from 'express-session';
import passport from 'passport';
// form data
import bodyParser from 'body-parser'; 
// extracting all the .env varibles
dotenv.config();
// instance of an express app
const app = express();

// Enable CORS for all origins (adjust for production!)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// url-encoded-data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const API_KEY_DESTINATION_IMAGES_ACCESS_KEY = process.env.DESTINATION_PHOTO_BY_ACCESS_KEY_API
const API_KEY_DESTINATION_IMAGES_SECRET_KEY = process.env.DESTINATION_PHOTO_BY_SECRET_KEY_API
const API_KEY_DESTINATION_WEATHER = process.env.WEATHER_API_BY_LOCATION
const API_KEY_DESTINATION_Hotels = process.env.Hotel_Api_Key

// Basic health check route to test server & DB connection
app.post('/NewTrip', async (req, res) => {
  const { Traveller_Destination, adults, checkin_date, checkout_date } = req.body;

  // Basic validation
  if (!Traveller_Destination || !checkin_date || !checkout_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const destination = encodeURIComponent(Traveller_Destination);
  const numAdults = parseInt(adults) || 1;

  console.log("Received trip request:", { destination, numAdults, checkin_date, checkout_date });

  let imageRes;
  try {
    imageRes = await axios.get(
      `https://api.unsplash.com/search/photos?query=${destination}&client_id=${API_KEY_DESTINATION_IMAGES_ACCESS_KEY}`
    );
  } catch (e) {
    console.error("Unsplash API failed:", e.message);
    return res.status(500).json({ error: "Failed to fetch destination images" });
  }

  let weatherRes;
  let currentWeather;
  try {
    weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${API_KEY_DESTINATION_WEATHER}&units=metric`
    );
    currentWeather = weatherRes.data.main.temp;
  } catch (e) {
    console.error("Weather API failed:", e.message);
    return res.status(500).json({ error: "Failed to fetch weather data" });
  }

  let idRes;
  try {
    idRes = await axios.get(
      `https://api.makcorps.com/mapping?api_key=${API_KEY_DESTINATION_Hotels}&name=${destination}`
    );
  } catch (e) {
    console.error("Makcorps mapping API failed:", e.message);
    return res.status(500).json({ error: "Failed to fetch destination ID from Makcorps API" });
  }

  if (!idRes.data || !Array.isArray(idRes.data) || idRes.data.length === 0) {
    return res.status(400).json({ error: "Destination not found in Makcorps API" });
  }

  let hotelsRes;
  try {
    const firstEntry = idRes.data[0];
    if (firstEntry.type === "GEO") {
      const cityId = firstEntry.document_id;
      hotelsRes = await axios.get(
        `https://api.makcorps.com/city?cityid=${cityId}&pagination=0&cur=USD&rooms=1&adults=${numAdults}&checkin=${checkin_date}&checkout=${checkout_date}&api_key=${API_KEY_DESTINATION_Hotels}`
      );
    } else {
      const hotelId = firstEntry.document_id;
      hotelsRes = await axios.get(
        `https://api.makcorps.com/hotel?hotel_id=${hotelId}&pagination=0&cur=USD&rooms=1&adults=${numAdults}&checkin=${checkin_date}&checkout=${checkout_date}&api_key=${API_KEY_DESTINATION_Hotels}`
      );
    }
  } catch (e) {
    console.error("Makcorps hotels API failed:", e.message);
    return res.status(500).json({ error: "Failed to fetch hotels data" });
  }

  // Send final response
  res.json({
    message: "Form received successfully",
    data: req.body,
    images: imageRes.data.results,
    weather: {
      temp_celsius: currentWeather,
      details: weatherRes.data.weather
    },
    hotels: {
      hotels : hotelsRes.data
    }
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
