/* --------------------------------Imports--------------------------------*/

import { useState, createContext, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

import SingleLeft from "../components/SingleLeft";
import SingleRight from "../components/SingleRight";

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
    const [booking, setBooking] = useState(null) // current booking if on booking page
    

    const { listingId, bookingId } = useParams();

    const fetchListing = async (id) => {
        try {
            setListing(await services.getSingleProperty(id))
        } catch (error) {
            console.error("Error fetching property details:", error.message);
        }
    }

    const fetchBooking = async (id) => {
        setBooking(await services.getSingleBooking(id))
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


    useEffect(() => {
        if (pageState === "booking" && bookingId) {
            fetchBooking(bookingId)
        }
    }, [pageState, bookingId])


    const singleObject = { listing, pageState, booking }

    return (
        <SingleContext.Provider value={singleObject} >

            <main className="single-main">

                <div className="w-full flex flex-col sm:flex-row justify-between mb-6">
                    {loading ? (null) : (

                        location.pathname.includes("booking") ? (
                                <h1 className="single-h1">
                                <span className="text-logoColor">Booking by</span> {booking?.guest?.username} <span className="text-logoColor"> at: </span>  
                                {listing.title}</h1>
                            ) : (
                                <h1 className="single-h1"> {listing.title}</h1>
                            )
                        
                        )
                    }
                    {pageState === "listing" ? (
                        <Link to="/listings" className="text-logoColor underline hover:text-textColor mt-6 lg:mt-0">back to listings</Link>
                        ) : (
                        <Link to="/dashboard/guest" className="text-logoColor underline hover:text-textColor mt-6 lg:mt-0">back to dashboard</Link>
                        )
                    }
                    
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