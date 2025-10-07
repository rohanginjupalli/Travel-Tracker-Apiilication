import React from 'react';
import Hotels from './Hotels';

function HotelsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose} // close when clicking background
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-2/3 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // prevent close on modal click
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Available Hotels
        </h2>

        {/* Reuse your Hotels component */}
        <Hotels />
      </div>
    </div>
  );
}

export default HotelsModal;
