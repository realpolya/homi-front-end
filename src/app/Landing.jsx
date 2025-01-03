/* --------------------------------Imports--------------------------------*/

import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../App.jsx';

import LandingMap from '../components/LandingMap.jsx'
import ListingCard from '../components/ListingCard.jsx'

/* --------------------------------Component--------------------------------*/

const Landing = () => {

    const { properties } = useContext(AppContext);

    const [recentListings, setRecentListings] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {

        if (properties) {
            let fourListings;
            fourListings = Array.from(properties)

            if (properties.length > 4) {
                fourListings.length = 4
            }

            setRecentListings(fourListings)
            setLoading(false)
        }

    }, [properties])


    return (
        <main className="landing-main">

            <div className="landing-left">
                <h1 className="text-left text-2xl h-auto pb-4 lg:h-[10%]">
                    <span className="text-logoColor">homi</span> is where you find your next <span className="text-logoColor">homey</span> stay
                </h1>
                < LandingMap />
            </div>

            <div className="landing-right">

                <p className="text-left p-6 text-2xl w-full text-lightTextColor hover:text-logoColor">
                    <Link to="/listings">Recent Listings</Link>
                </p>

                {
                    loading ? (
                        <p className="text-lightTextColor">No properties yet...</p>
                    ) : (
                        <div className="landing-listings">
                            {recentListings.length === 0 ? (null) : (

                            recentListings.map((listing) => {
                                return <ListingCard key={listing.id} listing={listing} origin={"landing"} bookingId={null}/>
                            })

                            )}
                        </div>
                    )
                }

            </div>

        </main>
    );
};

/* --------------------------------Exports--------------------------------*/

export default Landing
