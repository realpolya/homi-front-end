import { useEffect, useState } from "react";
import { ListingCard } from "../components/ListingCard";
// import getListings API call from services file

export const Listing = () => {
  const [listings, setListings] = useState([
    {
      id: 1,
      amenities: [1, 3, 5],
      amenities_nested: [
        {
          id: 1,
          name: "Heating",
          image:
            "https://www.reshot.com/preview-assets/icons/VJLXFPZWAB/water-heating-VJLXFPZWAB.svg",
        },
        {
          id: 3,
          name: "WiFi",
          image:
            "https://www.reshot.com/preview-assets/icons/DQZC9PBJME/wifi-DQZC9PBJME.svg",
        },
        {
          id: 5,
          name: "Gym",
          image:
            "https://www.reshot.com/preview-assets/icons/WS79HTVFXE/gym-dumbbell-WS79HTVFXE.svg",
        },
      ],
      address: {
        id: 1,
        street: "9656 Main St",
        city: "Briarwood",
        state: "NY",
        zip_code: "11435",
        country: "USA",
        latitude: 40.7096035,
        longitude: -73.81909,
        address_string: "9656 Main St, Briarwood, New York, USA",
        prop: 1,
      },
      photos: [
        {
          id: 1,
          link: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          prop: 1,
        },
      ],
      first_photo: {
        id: 1,
        link: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=2448&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        prop: 1,
      },
      title: "House in New York, NY",
      description: "This is a description for House in New York.",
      price_per_night: 137,
      max_guests: 4,
      property_type: "CA",
      is_active: true,
      cleaning_fee: 28,
      cancellation_policy: "Non-Refundable",
      user: 1,
    },
  ]);

  // useEffect to make API call to fill our listings state
  // const fetchListings = async () => {
  //   try {
  //     const response = await getListings()
  //     setListings(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(()=>{
  //   fetchListings()
  // }, [])

  return (
    <div>
      <h1>Listings</h1>
      <div className="listing-cards-container">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};
