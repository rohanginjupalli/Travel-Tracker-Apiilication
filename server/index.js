import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
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

  //  Unsplash 
  let imageRes;
  try {
    imageRes = await axios.get(
      `https://api.unsplash.com/search/photos?query=${destination}&client_id=${API_KEY_DESTINATION_IMAGES_ACCESS_KEY}`
    );
  } catch (e) {
    console.error("Unsplash API failed:", e.message);
    return res.status(500).json({ error: "Failed to fetch destination images" });
  }

  //  Weather (using Open-Meteo: free, no API key)
  //  We first geocode the destination to get lat/lon, then request current weather
  let weatherRes;
  let currentWeather;
  try {
    // geocode the destination
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${destination}&count=1`;
    const geoResp = await axios.get(geocodeUrl);
    const geoData = geoResp.data;

    if (!geoData || !geoData.results || geoData.results.length === 0) {
      throw new Error('Geocoding returned no results');
    }

    const { latitude, longitude, name: resolvedName, country } = geoData.results[0];

    // fetch current weather from Open-Meteo
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
    weatherRes = await axios.get(weatherUrl);

    // Open-Meteo returns current_weather.temperature in Celsius
    currentWeather = weatherRes.data?.current_weather?.temperature ?? null;
    console.log(`Resolved location: ${resolvedName}, ${country} (${latitude},${longitude}) - temp: ${currentWeather}`);
  } catch (e) {
    console.error("Weather API failed:", e.message);
    // continue without blocking: set currentWeather to null but let other APIs proceed
    currentWeather = 0;
  }

  // SerpApi Google Hotels
  let hotelsRes;
  try {
    const serpUrl = `https://serpapi.com/search.json?engine=google_hotels&q=${destination}&check_in_date=${checkin_date}&check_out_date=${checkout_date}&adults=${numAdults}&currency=USD&gl=in&api_key=${SERP_API_KEY}`;

    hotelsRes = await axios.get(serpUrl);

    console.log("SerpApi Hotel Data Sample:", hotelsRes.data.properties?.slice(0, 2));
  } catch (e) {
    console.error("SerpApi Hotels API failed:", e.message);
    return res.status(500).json({ error: "Failed to fetch hotels data" });
  }

  let  trip_id;
  // database logic

    try {
          const userTripResponse = await axios.post('http://localhost:5001/user/NewTrip', {
            userName: req.body.userName,
            title: req.body.title,
            tripType: req.body.tripType,
            Traveller_Destination: req.body.Traveller_Destination,
            adults: req.body.adults,
            budget: req.body.budget,
            checkin_date: req.body.checkin_date,
            checkout_date: req.body.checkout_date
          });
          trip_id = userTripResponse.data.tripId;
          console.log("Trip created with ID:", trip_id);
        } catch (error) {
          console.error("Unable to reach http://localhost:5001/user/NewTrip", error.message);
          return res.status(500).json({ error: "Unable to save trip in database" });
        }

      if (!trip_id) {   
      console.error("Trip ID is missing. Skipping weather insertion.");
      return res.status(500).json({ error: "Trip not created successfully" });
    }


  // sending the api data to store in the database
  try{
      await axios.post('http://localhost:5001/user/NewTrip/apidata',{
      hotels: hotelsRes.data.properties || [],
      Destination: destination,
      About_Destination: req.body.title,
      temp_celsius: currentWeather,
      trip_id:trip_id
  })
  }catch(error){
    console.log("unable to reach the route http://localhost:5001/user/NewTrip/apidata ",error);
    console.error("Unable to reach http://localhost:5001/user/NewTrip/apidata", error.message);

  }
  

  // Final Response
  res.json({
    message: "Form received successfully",
    data: req.body,
    images: imageRes?.data?.results || [],
    weather: {
      temp_celsius: currentWeather,
      details: weatherRes?.data?.current_weather ? weatherRes.data.current_weather : null
    },
    hotels: hotelsRes?.data?.properties || [],
    Destination: destination,
    About_Destination: req.body.title
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
