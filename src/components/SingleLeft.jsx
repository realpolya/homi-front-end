/* --------------------------------Imports--------------------------------*/

import { useContext, useEffect, useState } from "react";

import { SingleContext } from "../app/SingleListingBooking.jsx";

import FivePicture from "./FivePicture.jsx";
import Calendar from "./Calendar.jsx";
import MiniListingForm from "./MiniListingForm.jsx";

import services from "../services/index.js";

/* --------------------------------Component--------------------------------*/

const SingleLeft = ({ listingId }) => {

    const { listing } = useContext(SingleContext)

    const [host, setHost] = useState("");
    const [price, setPrice] = useState(0);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [blockedDates, setBlockedDates] = useState([])
    const [chosenDates, setChosenDates] = useState()


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


    useEffect(() => {

        if (bookings) {
            const newBlockedDates = bookings.reduce((arg, booking) => {
                let start = new Date(booking.check_in_date)
                let end = new Date(booking.check_out_date)

                const checkIn = new Date(start.getFullYear(), start.getMonth(), start.getDate());
                const checkOut = new Date(end.getFullYear(), end.getMonth(), end.getDate());

                const dates = []
                for (let d = new Date(checkIn); d <= checkOut; d.setDate(d.getDate() + 1)) {
                    dates.push(new Date(d))
                }

                return [...arg, ...dates];
            }, [])

            setBlockedDates(newBlockedDates)
        }

    }, [bookings])


    return (
        <section className="section-left">
            <FivePicture />

            <div className="w-full flex flex-col sm:flex-row justify-between mb-6">
                <p>Hosted by <span className="text-logoColor font-semibold">{host}</span></p>
                <p><span className="text-alternativeColor font-semibold">${price}</span>{" "}per night</p>
            </div>

            <div className="div-cale-mini">
                <Calendar blockedDates={blockedDates} setChosenDates={setChosenDates} />
                <MiniListingForm bookings={bookings} blockedDates={blockedDates} 
                chosenDates={chosenDates} required />
            </div>
        </section>
    );
};

/* --------------------------------Exports--------------------------------*/

export default SingleLeft