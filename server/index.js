import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { query } from './db.js';
import session from 'express-session';
import passport from 'passport';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API_KEY_DESTINATION_IMAGES_ACCESS_KEY = process.env.DESTINATION_PHOTO_BY_ACCESS_KEY_API;
const API_KEY_DESTINATION_WEATHER = process.env.WEATHER_API_BY_LOCATION;
const SERP_API_KEY = process.env.SERP_API_KEY;

app.post('/NewTrip', async (req, res) => {
  const { Traveller_Destination, adults, checkin_date, checkout_date } = req.body;

  if (!Traveller_Destination || !checkin_date || !checkout_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const destination = encodeURIComponent(Traveller_Destination);
  const numAdults = parseInt(adults) || 1;

  console.log("Received trip request:", { destination, numAdults, checkin_date, checkout_date });

  // --- Unsplash ---
  let imageRes;
  try {
    imageRes = await axios.get(
      `https://api.unsplash.com/search/photos?query=${destination}&client_id=${API_KEY_DESTINATION_IMAGES_ACCESS_KEY}`
    );
  } catch (e) {
    console.error("Unsplash API failed:", e.message);
    return res.status(500).json({ error: "Failed to fetch destination images" });
  }

  // --- Weather ---
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

  // --- SerpApi Google Hotels ---
  let hotelsRes;
  try {
    const serpUrl = `https://serpapi.com/search.json?engine=google_hotels&q=${destination}&check_in_date=${checkin_date}&check_out_date=${checkout_date}&adults=${numAdults}&currency=USD&gl=in&api_key=${SERP_API_KEY}`;

    hotelsRes = await axios.get(serpUrl);

    console.log("SerpApi Hotel Data Sample:", hotelsRes.data.properties?.slice(0, 2));
  } catch (e) {
    console.error("SerpApi Hotels API failed:", e.message);
    return res.status(500).json({ error: "Failed to fetch hotels data" });
  }

  // --- Final Response ---
  res.json({
    message: "Form received successfully",
    data: req.body,
    images: imageRes.data.results,
    weather: {
      temp_celsius: currentWeather,
      details: weatherRes.data.weather
    },
    hotels: hotelsRes.data.properties || [],
    Destination: destination,
    About_Destination: req.body.title
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
