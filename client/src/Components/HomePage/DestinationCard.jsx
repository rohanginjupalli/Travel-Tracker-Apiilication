import React, { useContext, useState } from "react";
import { TripContext } from "../Context/TripContext";
import HotelsModal from "../HotelsAvailable/HotelsModal";

function DestinationCard() {
  const { weather, descDestination, destination, image } = useContext(TripContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);

  // Safely get first image URL
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {/* Display first image */}
      <img
  className="w-full"
  src={image?.[4]?.urls?.thumb || "https://via.placeholder.com/400"}
  alt={destination || "Destination"}
/>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          Destination: {destination}
        </div>
        <p className="text-gray-700 text-base">
          About the Destination: {descDestination}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Current Weather: {weather?.temp_celsius ?? "N/A"}
        </span>

        <button
          onClick={handleClick}
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 transition"
        >
          View Available Hotels
        </button>
      </div>

      {/* Modal Popup */}
      <HotelsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default DestinationCard;
