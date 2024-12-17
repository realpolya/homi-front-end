/* --------------------------------Imports--------------------------------*/

import { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { SingleContext } from "../app/SingleListingBooking.jsx";
import { AppContext } from "../App.jsx"
import BookingForm from "./BookingForm.jsx";

import services from "../services/index.js"

/* --------------------------------Component--------------------------------*/

const MiniListingForm = ({ bookings, required, blockedDates }) => {

    const { pageState, listing, booking } = useContext(SingleContext)
    const { user, setShowLogin } = useContext(AppContext)

    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [total, setTotal] = useState(0);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [cleaningFee, setCleaningFee] = useState(0);


    useEffect(() => {
        if (listing) setCleaningFee(listing.cleaning_fee)
    }, [listing])

    useEffect(() => {
        if (pageState === "booking" && booking) {
            setCheckInDate(booking.check_in_date)
            setCheckOutDate(booking.check_out_date)
            setTotal(booking.total_price)
        }
    }, [booking])

    const isDateBlocked = (date) => {
        if (!date || isNaN(date)) return false;
        const formattedDate = date.toISOString().split("T")[0];
        return bookings.some((booking) => booking.check_in_date === formattedDate);
    };

    const handleCheckInChange = (e) => {
        const date = new Date(e.target.value);
        if (isDateBlocked(date)) {
            setErrorMessage("Selected check-in date is not available.");
        } else {
            setErrorMessage("");
            setCheckInDate(e.target.value);
        }
    };

    const handleCheckOutChange = (e) => {
        const date = new Date(e.target.value);
        if (isDateBlocked(date)) {
            setErrorMessage("Selected check-out date is not available.");
        } else {
            setErrorMessage("");
            setCheckOutDate(e.target.value);

            const checkIn = new Date(checkInDate);
            const checkOut = new Date(e.target.value);

            const nights =
            checkInDate && e.target.value && checkOut > checkIn
                ? (checkOut - checkIn) / (1000 * 60 * 60 * 24)
                : 0;

            const totalCost =
            nights > 0 ? nights * listing.price_per_night + cleaningFee : 0;

            setTotal(totalCost);
        }
    };

    const handleSubmit = () => {
        if (errorMessage) {
            alert("Please fix the errors before reserving.");
            return;
        }
        setIsBookingModalOpen(true);
    };

    // TODO: function to delete reservation - link to the cancel button


    return (
        <div className="div-mini-form">

            {pageState === "listing" ? (

                <form className="w-full">
                    <label htmlFor="checkInDate" className="block text-sm font-medium mb-1">
                        Check-in Date:
                    </label>
                    <input
                        type="date"
                        id="checkInDate"
                        value={checkInDate}
                        onChange={handleCheckInChange}
                        required={required}
                        className={`border rounded-lg p-2 mb-4 w-full text-center ${
                        errorMessage && isDateBlocked(new Date(checkInDate))
                            ? "border-red-500"
                            : ""
                        }`}
                    />

                    <label
                        htmlFor="checkOutDate"
                        className="block text-sm font-medium mb-1"
                    >
                        Check-out Date:
                    </label>
                    <input
                        type="date"
                        id="checkOutDate"
                        value={checkOutDate}
                        onChange={handleCheckOutChange}
                        required={required}
                        className={`border rounded-lg p-2 mb-4 w-full text-center ${
                        errorMessage && isDateBlocked(new Date(checkOutDate))
                            ? "border-red-500"
                            : ""
                        }`}
                    />

                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                    )}

                    <label htmlFor="total" className="block text-sm font-medium mb-1">
                        Total price:
                    </label>
                    <input
                        type="number"
                        id="total"
                        value={total}
                        readOnly
                        required={required}
                        className="border rounded-lg p-2 mb-4 w-full text-center bg-gray-100"
                    />

                    {user ? (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="form-button"
                            >
                                Reserve
                            </button>
                        ) : (
                            <button
                            type="button"
                            onClick={setShowLogin}
                            className="form-button"
                            >
                                Log In to Reserve
                            </button>
                        )
                    }

                </form>
            ) : (
                pageState === "booking" ? (

                    <form className="w-full">
                    <label htmlFor="checkInDate" className="block text-sm font-medium mb-1">
                        Check-in Date:
                    </label>
                    <input
                        type="date"
                        id="checkInDate"
                        readOnly
                        value={checkInDate}
                        required={required}
                        className="border rounded-lg p-2 mb-4 w-full text-center"
                    />

                    <label
                        htmlFor="checkOutDate"
                        className="block text-sm font-medium mb-1"
                    >
                        Check-out Date:
                    </label>
                    <input
                        type="date"
                        id="checkOutDate"
                        readOnly
                        value={checkOutDate}
                        required={required}
                        className="border rounded-lg p-2 mb-4 w-full text-center"
                    />

                    <label htmlFor="total" className="block text-sm font-medium mb-1">
                        Total price:
                    </label>
                    <input
                        type="number"
                        id="total"
                        value={total}
                        readOnly
                        className="border rounded-lg p-2 mb-4 w-full text-center bg-gray-100"
                    />

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-logoColor text-white font-medium 
                        rounded-full py-2 px-6 mt-2 w-full transition-transform 
                        transform active:scale-95 hover:bg-backgroundColor"
                    >
                        Edit reservation
                    </button>

                    <button
                        type="button"
                        className="form-button"
                    >
                        Cancel reservation
                    </button>
                
                </form>

                ) : ( 
                    <div>
                    <button
                        type="button"
                        className="form-button"
                    >
                        Archive listing
                    </button>
                    <button
                        type="button"
                        className="form-button"
                    >
                        Edit listing
                    </button>
                    <button
                        type="button"
                        className="form-button"
                    >
                        View bookings related to listing
                    </button>
                    </div>
                )
            )}

            

            {isBookingModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                    <BookingForm
                        blockedDates={blockedDates}
                        onClose={() => setIsBookingModalOpen(false)}
                        initialCheckInDate={checkInDate}
                        initialCheckOutDate={checkOutDate}
                        total={total}
                    />
                    </div>
                </div>
            )}
        </div>
    );
};

/* --------------------------------Exports--------------------------------*/

export default MiniListingForm