import { useContext } from 'react'
import { TripContext } from './Context/TripContext';
import {set, useForm} from 'react-hook-form'
import axios from 'axios'
import DestinationCard from './HomePage/DestinationCard';
import Hotels from './HotelsAvailable/Hotels';


function NewTrip() {

    const {
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
    } = useContext(TripContext);

    const {register,handleSubmit} = useForm();
    const onSubmit = async (data)=>{
      try{
        const res = await axios.post('http://localhost:5000/NewTrip',data);
        console.log(res.data);
        setWeather({
          location: data.Traveller_Destination,
          current_weather: res.data.weather.temp_celsius
        });
        setdescDestination((prevValue)=>{
          return res.data.About_Destination
        })
        setDestination(()=>{
          return res.data.Destination;
        })
        setHotels(()=>{
          return res.data.hotels;
        })
        setImages(()=>{
          return res.data.images
        })
      }catch(err){
        console.error("Error submitting form:", err)
        alert("Something went wrong")
      }
    }
  return (
    <div>
      <form className="max-w-md mx-auto border-2 border-black p-5 m-5" onSubmit={handleSubmit(onSubmit)} >

        <div className="relative z-0 w-full mb-5 group ">
            {/* Destination title */}
          <input 
            type="text" 
            id="text" 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                       border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                       dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder="" 
            {...register('title')}
          />
          <label 
            htmlFor="text" 
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                       duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                       peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto 
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                       peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                       peer-focus:scale-75 peer-focus:-translate-y-6">
            Destination Title
          </label>
        </div>

    <div className="relative z-0 w-full mb-5 group text-black">
            {/* Destination  */}
          <input 
            type="text" 
            id="text" 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                       border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                       dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
            placeholder=" " 
            required 
            {...register('Traveller_Destination')}
          />
          <label 
            htmlFor="title" 
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                       duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                       peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto 
                       peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                       peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                       peer-focus:scale-75 peer-focus:-translate-y-6">
            Destination
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input 
              type="text" 
              id="Trip-Type" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                         border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                         dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
              placeholder=" " 
              required 
              {...register('tripType')}
            />
            <label 
              htmlFor="Trip-Type" 
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                         duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                         peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto 
                         peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                         peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                         peer-focus:scale-75 peer-focus:-translate-y-6">
              Tell about Trip type
            </label>
          </div>
        </div>

    <div className="grid md:grid-cols-2 md:gap-6">
  {/* Number of Adults */}
  <div className="relative z-0 w-full mb-5 group">
    <input 
      type="number" 
      id="adults" 
      min="1"
      className="block py-2.5 px-2 w-full text-sm 
                 text-gray-900 dark:text-gray-100 
                 bg-white dark:bg-gray-800 
                 border-0 border-b-2 border-gray-300 
                 appearance-none focus:outline-none focus:ring-0 
                 focus:border-blue-600 peer" 
      placeholder="No.of Adults " 
      required 
      {...register('adults')}
    />
    <label 
      htmlFor="adults" 
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6">
    </label>
  </div>

  {/* Budget */}
  <div className="relative z-0 w-full mb-5 group">
    <input 
      type="number" 
      id="budget" 
      min="0"
      className="block py-2.5 px-2 w-full text-sm 
                 text-gray-900 dark:text-gray-100 
                 bg-white dark:bg-gray-800 
                 border-0 border-b-2 border-gray-300 
                 appearance-none focus:outline-none focus:ring-0 
                 focus:border-blue-600 peer" 
      placeholder="Budget..." 
      required 
      {...register('budget')}
    />
    <label 
      htmlFor="budget" 
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-6">
    </label>
  </div>
</div>    

    <div className="grid md:grid-cols-2 md:gap-6">
            {/* Check-in Date */}
        <div className="relative z-0 w-full mb-5 group">
                <input 
                type="date" 
                id="checkin_date" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                            border-0 border-b-2 border-gray-300 appearance-none 
                            dark:text-white dark:border-gray-600 
                            dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                            focus:border-blue-600 peer" 
                placeholder=" " 
                required
                {...register('checkin_date')} 
                />
                <label 
                htmlFor="checkin_date" 
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                            duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto 
                            peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6">
                Check-in Date
                </label>
            </div>

            {/* Check-out Date */}
            <div className="relative z-0 w-full mb-5 group">
                <input 
                type="date" 
                id="checkout_date" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                            border-0 border-b-2 border-gray-300 appearance-none 
                            dark:text-white dark:border-gray-600 
                            dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                            focus:border-blue-600 peer" 
                placeholder=" " 
                required 
                {...register('checkout_date')}
                />
                <label 
                htmlFor="checkout_date" 
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                            duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto 
                            peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6">
                Check-out Date
                </label>
            </div>
</div>

        <button 
          type="submit" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                     focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto 
                     px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                     dark:focus:ring-blue-800 " >
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewTrip
