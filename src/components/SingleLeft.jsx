/* --------------------------------Imports--------------------------------*/

import { useContext, useEffect, useState } from "react";
import { SingleContext } from "../app/SingleListingBooking.jsx";
import { AppContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import { FivePicture } from "./FivePicture";
import { MiniListingForm } from "./MiniListingForm";
import { Calendar } from "./Calendar";

import services from "../services/index.js";

/* --------------------------------Component--------------------------------*/

const SingleLeft = ({ listingId }) => {

    const { user } = useContext(AppContext)
    const { listing } = useContext(SingleContext)

    const [host, setHost] = useState("");
    const [price, setPrice] = useState(0);
    const [bookings, setBookings] = useState([]);
    const [currListing, setCurrListing] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async (id) => {
        try {
            setBookings(await services.getPropBookings(id));
        } catch (error) {
            console.error("Error fetching bookings:", error.message);
        }
    };

    useEffect(() => {
        if (listing) {
            setCurrListing(listing);
            setPrice(listing.price_per_night);
            if (listing.user_info){
                setHost(listing.user_info.username);
            }
            setLoading(false);
            fetchBookings(listingId);
        }
    }, [listing, listingId]);

    return (
        <section className="flex flex-col p-6 space-y-3 w-full bg-whiteColor rounded-lg overflow-y-auto">
            <FivePicture />

            <div className="w-full flex flex-col sm:flex-row justify-between mb-6">
            <p>
                Hosted by <span className="text-logoColor font-semibold">{host}</span>
            </p>
            <p>
                <span className="text-alternativeColor font-semibold">${price}</span>{" "}
                per night
            </p>
            </div>

            {/* Flex container for calendar and listing form */}
            <div className="flex flex-col sm:flex-row rounded-lg mt-0 w-full gap-4 sm:gap-6">
                <Calendar bookings={bookings} />
                <MiniListingForm bookings={bookings} required />
            </div>
        </section>
    );
};

/* --------------------------------Exports--------------------------------*/

export default SingleLeft