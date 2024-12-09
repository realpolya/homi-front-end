/* --------------------------------Imports--------------------------------*/

import { useState, createContext, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

import SingleLeft from "../components/SingleLeft";
import { SingleRight } from "../components/SingleRight";

import services from "../services/index.js"

/* --------------------------------Variables--------------------------------*/

const SingleContext = createContext(null);

const pageStateOptions = [
  "listing",
  "booking",
  "host-listing"
]

/* --------------------------------Component--------------------------------*/

const SingleListingBooking = () => {

    const location = useLocation();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pageState, setPageState] = useState('listing')

    const { listingId } = useParams();

    const fetchListing = async (id) => {
        try {
            setListing(await services.getSingleProperty(id))
        } catch (error) {
            console.error("Error fetching property details:", error.message);
        }
    }

    /* USE EFFECT */
    useEffect(() => {

        if (listingId) fetchListing(listingId)

    }, [location.pathname])


    useEffect(() => {

        if (listing) setLoading(false)
 
    }, [listing])


    useEffect(() => {

        if (location.pathname.includes("booking")) {
            setPageState("booking")
        } else if (location.pathname.includes("owner")) {
            setPageState("host-listing")
        } else {
            setPageState("listing")
        }

    }, [location.pathname])


    const singleObject = { listing, pageState }

    return (
        <SingleContext.Provider value={singleObject} >

            <main>
                <div className="w-full flex flex-col sm:flex-row justify-between mb-6">
                    {loading ? (null) : (

                        location.pathname.includes("booking") ? (
                                    <h1 className="text-left text-2xl">
                                    <span className="text-logoColor">Your booking at: </span>  
                                    {listing.title}</h1>
                                ) : (
                                    <h1 className="text-left text-2xl"> {listing.title}</h1>
                            )
                        
                        )
                    }
                    <Link to="/listings" className="text-logoColor underline hover:text-textColor">back to listings</Link>
                </div>
                
                <div className="div-left-right">
                    <SingleLeft listingId={listingId}/>
                    <SingleRight />
                </div>

            </main>

        </SingleContext.Provider>
    );


};

/* --------------------------------Exports--------------------------------*/

export default SingleListingBooking
export { SingleContext }