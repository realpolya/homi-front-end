/* --------------------------------Imports--------------------------------*/

import { useContext, useEffect, useState } from "react";

import { SingleContext } from "../app/SingleListingBooking.jsx";
import { FivePicture } from "./FivePicture.jsx";
import MiniListingForm from "./MiniListingForm.jsx";
import Calendar from "./Calendar.jsx";

import services from "../services/index.js";

/* --------------------------------Component--------------------------------*/

const SingleLeft = ({ listingId }) => {

    const { listing } = useContext(SingleContext)

    const [host, setHost] = useState("");
    const [price, setPrice] = useState(0);
    const [bookings, setBookings] = useState([]);
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
            setPrice(listing.price_per_night);
            if (listing.user_info){
                setHost(listing.user_info.username);
            }
            setLoading(false);
            fetchBookings(listingId);
        }
    }, [listing, listingId]);

    return (
        <section className="section-left">
            <FivePicture />

            <div className="w-full flex flex-col sm:flex-row justify-between mb-6">
                <p>Hosted by <span className="text-logoColor font-semibold">{host}</span></p>
                <p><span className="text-alternativeColor font-semibold">${price}</span>{" "}per night</p>
            </div>

            <div className="flex flex-col sm:flex-row rounded-lg mt-0 w-full gap-4 sm:gap-6">
                <Calendar bookings={bookings} />
                <MiniListingForm bookings={bookings} required />
            </div>
        </section>
    );
};

/* --------------------------------Exports--------------------------------*/

export default SingleLeft