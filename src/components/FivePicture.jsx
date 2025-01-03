/* --------------------------------Imports--------------------------------*/

import { useContext, useEffect, useState } from 'react';

import { SingleContext } from '../app/SingleListingBooking.jsx';

/* --------------------------------Component--------------------------------*/

export const FivePicture = () => {

  const { listing } = useContext(SingleContext);
  const [photos, setPhotos] = useState(undefined)
  const [firstPhoto, setFirstPhoto] = useState(undefined)

  // wait for photos to load
  useEffect(() => {

    if (listing) {

      let listingPhotos = Array.from(listing.photos)
      let firstListPhoto = listingPhotos.shift()

      if (listing.photos.length > 4) {
        listingPhotos.length = 4
      }

      setFirstPhoto(firstListPhoto)
      setPhotos(listingPhotos)

    }

  }, [listing])


  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4 rounded-lg h-[38%]">

      { firstPhoto ? (
        <img
        src={firstPhoto.link}
        alt={listing.title}
        className="w-full h-full object-cover rounded-lg row-span-2"
      />
      ) : (null)}

      { photos ? 
      (photos.map((photo, i) => {

        return <img
          src={photo.link}
          alt={listing.title}
          key={i}
          className="w-full h-full object-cover rounded-lg aspect-square"
        />

      })) : 
      (<p>Photos not loaded yet...</p>)
      }

    </div>
  );

  
};

/* --------------------------------Exports--------------------------------*/

export default FivePicture