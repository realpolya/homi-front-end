/* --------------------------------Imports--------------------------------*/

import { useState, useEffect } from "react";

/* --------------------------------Component--------------------------------*/

const BookingForm = ({
        blockedDates,
        onClose,
        initialCheckInDate="",
        initialCheckOutDate="",
    }) => {

        const [checkInDate, setCheckInDate] = useState("");
        const [checkOutDate, setCheckOutDate] = useState("");
        const [numberOfGuests, setNumberOfGuests] = useState(1);
        const [message, setMessage] = useState("");
        const [creditCard, setCreditCard] = useState("");

        useEffect(() => {
            setCheckInDate(initialCheckInDate);
            setCheckOutDate(initialCheckOutDate);
        }, [initialCheckInDate, initialCheckOutDate]);

        const isDateBlocked = (start, end) => {

            let startDate = new Date(start)
            let endDate = new Date(end)

            const checkIn = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            const checkOut = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

            const dates = []
            for (let d = new Date(checkIn); d <= checkOut; d.setDate(d.getDate() + 1)) {
                dates.push(new Date(d))
            }

            return blockedDates.some(blockedDate => 
                dates.some(date => blockedDate.getTime() === date.getTime())
            );

        };

        const handleSubmit = (e) => {
            e.preventDefault();

            if (!checkInDate || !checkOutDate) {
                alert("Please select both check-in and check-out dates.");
                return;
            }

            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);

            if (checkOut <= checkIn) {
                alert("Check-out date must be after check-in date.");
                return;
            }

            if (isDateBlocked(checkIn, checkOut)) {
                alert(
                    "The selected dates are unavailable. Please choose different dates."
                );
                return;
            }

            alert("Booking submitted successfully!");
            onClose();
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

                <h2 className="text-xl font-semibold mb-4">Book Your Stay</h2>

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
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
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
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
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
                            value={numberOfGuests}
                            onChange={(e) => setNumberOfGuests(e.target.value)}
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
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="border rounded-lg p-2 w-full"
                            rows="3"
                        ></textarea>
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
                            value={creditCard}
                            onChange={(e) => setCreditCard(e.target.value)}
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
