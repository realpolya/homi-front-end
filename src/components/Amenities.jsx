import React from 'react';
import { dummyAmenities } from "../dummy-data/dummy-amenities"

export const Amenities = () => {
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-2 gap-4 rounded-lg bg-white p-4">
        {dummyAmenities.slice(0, 5).map((photo, index) => (
          <div key={`${photo.prop_id}-${index}`} className="w-full h-full">
            <img
              src={photo.link}
              alt={`property ${photo.prop_id}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </>
  );
};


