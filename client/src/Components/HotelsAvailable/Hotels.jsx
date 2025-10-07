import React, { useContext } from 'react';
import { TripContext } from '../Context/TripContext';

function Hotels() {
  const { hotels } = useContext(TripContext);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
      {hotels.map((hotel, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-6">
            <h2 className="font-bold text-xl mb-2">{hotel.name}</h2>
            <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">
                Rating: {hotel.overall_rating}
              </span>
              {hotel.amenities?.map((amenity, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
              <span className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">
                Budget/night: {hotel.total_rate?.lowest}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hotels;
