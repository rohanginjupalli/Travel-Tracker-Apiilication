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

// Basic health check route to test server & DB connection
app.post('/NewTrip',async (req,res)=>{
  
  console.log("Data came from the frontend form was : ", req.body);
  
  res.json({ message: "Form received successfully", data: req.body });

  // API - to get the destination images
  const destination_image_api_url = await axios.get(`https://api.unsplash.com/search/photos?query=${req.body.Traveller_Destination}&client_id=${API_KEY_DESTINATION_IMAGES_ACCESS_KEY}&client_secret=${API_KEY_DESTINATION_IMAGES_SECRET_KEY}`);
  const response = destination_image_api_url.data
  console.log(response);
  console.log(req.body.Traveller_Destination);
  

})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
