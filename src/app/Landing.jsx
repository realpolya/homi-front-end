import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { LandingMap } from '../components/LandingMap.jsx'
import { ListingCard } from '../components/ListingCard.jsx'

import { AppContext } from '../App.jsx';

export const Landing = () => {
  const [user, setUser] = useState(null);
  const [recentListings,  setRecentListings] = useState([])
  const [loading, setLoading] = useState(true)

  const { properties } = useContext(AppContext);
  
  return (
    <main>
      <h1 className="text-left p-4 text-2xl">Welcome to Homi</h1>
      <div className="flex flex-row w-full h-5/6">
        < LandingMap />

        <div className="m-4 bg-alternativeColor w-1/2 h-full rounded-lg w-1/2">

            <p className="text-left p-6 text-2xl w-full text-lightTextColor"><Link to="/listings">Recent Listings</Link></p>

            {
              loading ? (
                <p className="text-lightTextColor">No properties yet...</p>
              ) : (
                <div className="listing-cards-container flex flex-row flex-wrap">
                  {listings.length === 0 ? (null) : (
                    listings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))
                  )}
                </div>
              )
            }

        </div>

      </div>
    </main>
  );
};
