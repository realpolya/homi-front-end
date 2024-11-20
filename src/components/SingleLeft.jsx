import { useContext, useEffect, useState } from 'react';
import { SingleContext } from '../app/SingleListingBooking.jsx';

import { FivePicture } from "./FivePicture";
import { MiniListingForm } from "./MiniListingForm";
import { Calendar } from "./Calendar";

export const SingleLeft = () => {

  const { listing } = useContext(SingleContext);
  const [host, setHost] = useState('')
  const [price, setPrice] = useState(0)

  // wait for photos to load
  useEffect(() => {

    if (listing) {

      setHost(listing.user)
      setPrice(listing.price_per_night)

    }

  }, [listing])


  return (
    <div className="flex flex-col p-6 space-y-3 w-full bg-whiteColor p-6 rounded-lg">
      
      <FivePicture />

      <div className="w-full flex flex-col sm:flex-row justify-between mb-6">
        <p>Hosted by {host}</p>
        <p><span className="text-alternativeColor font-semibold">${price}</span> per night</p>
      </div>

      {/* This shows the calendar and listing form side by side */}
      <div className="flex flex-row rounded-lg mt-0">
        <Calendar />
        <MiniListingForm />
      </div>

    </div>
  );

};
