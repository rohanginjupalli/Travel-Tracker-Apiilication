import React, { useContext } from 'react';
import { TripContext } from '../Context/TripContext';

function Hotels() {
  const { hotels } = useContext(TripContext);

  if (!hotels || hotels.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-600">No hotels available for this trip yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
      {hotels.map((hotel, index) => {
        const name = hotel.name || hotel.title || 'Unknown Hotel';
        const description = hotel.description || hotel.summary || '';
        const amenities = hotel.amenities || hotel.features || [];
        const price = hotel.total_rate?.lowest || hotel.price || hotel.rate_per_night?.extracted_lowest || 'N/A';

        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="font-bold text-xl mb-2">{name}</h2>
              {description && <p className="text-gray-600 text-sm mb-4">{description}</p>}
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">
                  Rating: {hotel.overall_rating ?? 'N/A'}
                </span>
                {amenities.map((amenity, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                <span className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">
                  Budget/night: {price}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Hotels;
