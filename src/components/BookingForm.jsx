/* --------------------------------Imports--------------------------------*/

import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { SingleContext } from "../app/SingleListingBooking.jsx";

import services from "../services/index.js";

/* --------------------------------Variables--------------------------------*/

const formDefault = {
    check_in_date: "",
    check_out_date: "",
    total_price: 0,
    message: "",
    number_of_guests: 1,
    credit_card: 0
}

/* --------------------------------Component--------------------------------*/

const BookingForm = ({
        blockedDates,
        onClose,
        initialCheckInDate="",
        initialCheckOutDate="",
        total=0
    }) => {

        const { pageState, listing, booking } = useContext(SingleContext)

        const  navigate = useNavigate();
        const { listingId, bookingId } = useParams();

        const [formData, setFormData] = useState(formDefault);


        useEffect(() => {

            setFormData(prev => {
                return {...prev, 
                    check_in_date: initialCheckInDate,
                    check_out_date: initialCheckOutDate,
                    total_price: total
                }
            })

        }, [initialCheckInDate, initialCheckOutDate, total]);


        useEffect(() => {

            if (booking && pageState === "booking") {
                setFormData({
                    check_in_date: booking.check_in_date,
                    check_out_date: booking.check_out_date,
                    total_price: booking.total_price,
                    message: booking.message,
                    number_of_guests: booking.number_of_guests,
                    credit_card: booking.credit_card
                })
            }

        }, [booking, pageState])


        const isDateBlocked = (start, end, edit=false, booking=null) => {

            let startDate = new Date(start)
            let endDate = new Date(end)

            const checkIn = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            const checkOut = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

            const dates = []
            for (let d = new Date(checkIn); d <= checkOut; d.setDate(d.getDate() + 1)) {
                dates.push(new Date(d))
            }


            let isUnavail = true
            if (edit && booking) {

                const bookingDates = []

                for (let d = new Date(booking.check_in_date); d <= booking.check_out_date; d.setDate(d.getDate() + 1)) {
                    bookingDates.push(new Date(d))
                }

                let filtered = blockedDates.filter(blockedDate => {
                    return bookingDates.some(date => blockedDate.getTime() === date.getTime());
                });

                isUnavail = filtered.some(blockedDate => 
                    dates.some(date => blockedDate.getTime() === date.getTime())
                );

            } else {

                isUnavail = blockedDates.some(blockedDate => 
                    dates.some(date => blockedDate.getTime() === date.getTime())
                );

            }

            return isUnavail;

        };


        const createBooking = async (prop_id, data) => {
            return await services.postBooking(prop_id, data)
        }


        const updateBooking = async (bookingId, data) => {
            return await services.putBooking(bookingId, data)
        }
        

        const updateTotal = (checkInDate, checkOutDate) => {

            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);

            if (checkOut <= checkIn) {
                alert("Check-out date must be after check-in date.");
                return;
            }

            const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

            const newTotal = nights * listing.price_per_night + listing.cleaning_fee;

            return setFormData(prev => ({...prev, total_price: newTotal}))

        }


        const handleChange = (e) => {

            const { name, value } = e.target;
            setFormData(prev => ({...prev, [name]: value }));

            if (name === "check_in_date" ) {

                updateTotal(value, formData.check_out_date)
                
            } else if (name === "check_out_date") {
                
                updateTotal(formData.check_in_date, value)

            } 

        };


        const handleSubmit = (e) => {

            e.preventDefault();

            if (!formData.check_in_date || !formData.check_out_date) {
                alert("Please select both check-in and check-out dates.");
                return;
            }

            const checkIn = new Date(formData.check_in_date);
            const checkOut = new Date(formData.check_out_date);

            if (checkOut <= checkIn) {
                alert("Check-out date must be after check-in date.");
                return;
            }

            if (pageState === "listing") {

                if (isDateBlocked(checkIn, checkOut)) {
                    alert(
                        "The selected dates are unavailable. Please choose different dates."
                    );
                    return;
                }

                createBooking(listingId, formData)
                alert("Booking submitted successfully!");

            } else if (pageState === "booking") {

                if (isDateBlocked(checkIn, checkOut, true, booking)) {
                    alert(
                        "The selected dates are unavailable. Please choose different dates."
                    );
                    return;
                }

                updateBooking(bookingId, formData)
                alert("Booking changed successfully!");
            }

            onClose();
            navigate("/dashboard/guest")

        };

        return (
            <div className="relative p-6 bg-white rounded-lg shadow-lg z-80">
                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                { pageState === "listing" ? (
                    <h2 className="text-xl font-semibold mb-4">Book Your Stay</h2>
                ) : (
                    <h2 className="text-xl font-semibold mb-4">Edit Your Booking</h2>
                )}

                

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="checkInDate"
                            className="block text-sm font-medium mb-1"
                        >
                            Check-in Date:
                        </label>
                        <input
                            type="date"
                            id="checkInDate"
                            name="check_in_date"
                            value={formData.check_in_date}
                            onChange={handleChange}
                            className="border rounded-lg p-2 w-full"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="checkOutDate"
                            className="block text-sm font-medium mb-1"
                        >
                            Check-out Date:
                        </label>
                        <input
                            type="date"
                            id="checkOutDate"
                            name="check_out_date"
                            value={formData.check_out_date}
                            onChange={handleChange}
                            className="border rounded-lg p-2 w-full"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="numberOfGuests"
                            className="block text-sm font-medium mb-1"
                        >
                            Number of Guests:
                        </label>
                        <input
                            type="number"
                            id="numberOfGuests"
                            name="number_of_guests"
                            value={formData.number_of_guests}
                            onChange={handleChange}
                            className="border rounded-lg p-2 w-full"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                            Special Requests:
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="border rounded-lg p-2 w-full"
                            placeholder="Type N/A if no requests"
                            rows="3"
                        ></textarea>
                    </div>

                    <div>
                        <label
                            htmlFor="totalPrice"
                            className="block text-sm font-medium mb-1"
                        >
                            Total Price ($):
                        </label>
                        <input
                            type="text"
                            id="totalPrice"
                            name="total_price"
                            disabled
                            value={formData.total_price}
                            className="border rounded-lg p-2 w-full"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="creditCard"
                            className="block text-sm font-medium mb-1"
                        >
                            Credit Card:
                        </label>
                        <input
                            type="text"
                            id="creditCard"
                            name="credit_card"
                            value={formData.credit_card}
                            onChange={handleChange}
                            className="border rounded-lg p-2 w-full"
                            required
                        />
                    </div>

                    <button
                    type="submit"
                    className="form-button"
                    >
                    Confirm Booking
                    </button>

                </form>
            </div>
        );
};

/* --------------------------------Exports--------------------------------*/

export default BookingForm
