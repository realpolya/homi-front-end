import React from 'react';
import { dummyAmenities } from "../dummy-data/dummy-amenities"

export const Amenities = () => {
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-2 gap-4 rounded-lg bg-white p-4">
        {dummyAmenities.map((photo, index) => (
          <div key={`${photo}${index}`} className="w-full h-full">
            <img
              src={photo}
              alt={`property ${photo}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </>
  );
};


