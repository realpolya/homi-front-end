import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { LandingMap } from '../components/LandingMap.jsx'
import { ListingCard } from '../components/ListingCard.jsx'

import { AppContext } from '../App.jsx';

export const Landing = () => {
  const [user, setUser] = useState(null);
  const [recentListings,  setRecentListings] = useState([])
  const [loading, setLoading] = useState(true)

  const { properties } = useContext(AppContext);


  useEffect(() => {

    if (properties) {
      let fourListings;
      fourListings = Array.from(properties)

      if (properties.length > 4) {
        fourListings.length = 4
      }

      setRecentListings(fourListings);
      setLoading(false)
    }

  }, [properties])

  
  return (
    <main className="flex flex-row w-full h-full">

        <div className="m-4 w-1/2 h-full flex-column">
          <h1 className="text-left text-2xl h-[10%]">homi is where you find your next homey stay</h1>
          < LandingMap />
        </div>

        <div className="m-4 w-1/2 h-full bg-alternativeColor rounded-lg flex flex-col justify-center">

            <p className="text-left p-6 text-2xl w-full text-lightTextColor hover:text-logoColor"><Link to="/listings">Recent Listings</Link></p>

            {
              loading ? (
                <p className="text-lightTextColor">No properties yet...</p>
              ) : (
                <div className="h-full w-full grid grid-rows-2 grid-cols-2 gap-4">
                  {recentListings.length === 0 ? (null) : (

                    recentListings.map((listing) => {
                      return <ListingCard key={listing.id} listing={listing} />
                    })

                  )}
                </div>
              )
            }

        </div>

    </main>
  );
};
