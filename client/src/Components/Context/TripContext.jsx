import React, { useState, createContext } from 'react';

const TripContext = createContext();

function Provider({ children }) {
  const [weather, setWeather] = useState({location :"",current_weather:""});
  const [hotels, setHotels] = useState([]);
  const [image,setImages] = useState([{}]);
  const [descDestination , setdescDestination] = useState('')
  const [destination,setDestination] = useState('')
  const valuesToBeShared = {
    weather,
    setWeather,
    hotels,
    setHotels,
    image,
    setImages,
    descDestination,
    setdescDestination,
    destination,
    setDestination
  };

  return (
    <TripContext.Provider value={valuesToBeShared}>
      {children}
    </TripContext.Provider>
  );
}

export { TripContext };
export default Provider;