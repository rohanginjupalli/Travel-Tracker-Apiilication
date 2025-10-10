import { useContext } from 'react';
import { TripContext } from './Context/TripContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import DestinationCard from './HomePage/DestinationCard';
import Hotels from './HotelsAvailable/Hotels';


function NewTrip() {
  const {
    weather, setWeather,
    hotels, setHotels,
    image, setImages,
    descDestination, setdescDestination,
    destination, setDestination  
  } = useContext(TripContext);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {

    // to reach out the data to backend server
    try {
      const res = await axios.post('http://localhost:5000/NewTrip', data);
      setWeather({ location: data.Traveller_Destination, current_weather: res.data.weather.temp_celsius });
      setdescDestination(res.data.About_Destination);
      setDestination(res.data.Destination);
      setHotels(res.data.hotels);
      setImages(res.data.images);
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong");
    }


  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-20">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Plan Your Trip</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Destination Info */}
          <div className="space-y-4">

            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register('userName', { required: true })}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />  
            <label className="block text-gray-700 font-medium">Destination Title</label>
            <input
              type="text"
              placeholder="Enter destination title"
              {...register('title')}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block text-gray-700 font-medium">Destination</label>
            <input
              type="text"
              placeholder="Enter destination city/place"
              {...register('Traveller_Destination')}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block text-gray-700 font-medium">About Trip</label>
            <input
              type="text"
              placeholder="Tell about the trip type"
              {...register('tripType')}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* People & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">Number of Adults</label>
              <input
                type="number"
                min="1"
                placeholder="No. of adults"
                {...register('adults')}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Budget</label>
              <input
                type="number"
                min="0"
                placeholder="Budget in USD"
                {...register('budget')}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">Check-in Date</label>
              <input
                type="date"
                {...register('checkin_date')}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Check-out Date</label>
              <input
                type="date"
                {...register('checkout_date')}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors duration-300"
          >
            Submit Trip
          </button>

        </form>
      </div>
    </div>
  );
}

export default NewTrip;
