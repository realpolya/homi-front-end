/* --------------------------------Imports--------------------------------*/

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import services from "../services/index.js";

/* --------------------------------Variables--------------------------------*/

const pageOptions = ["guest", "host", "past"]

/* --------------------------------Component--------------------------------*/

{/* <Route path="/bookings/guest" element={<Bookings />} />
<Route path="/bookings/host" element={<Bookings />} />
<Route path="/bookings/guest/past" element={<Bookings />} /> */}

const Bookings = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [isHost, setIsHost] = useState(false)
    const [bookings, setBookings] = useState([]);
    const [pageState, setPageState] = useState("guest")


    const fetchBookings = async () => {
        try {
            setBookings(await services.getBookings());
        } catch (err) {
            console.error("Error fetching bookings:", err);
        }
    };

    const fetchHostBookings = async () => {
        try {
            setBookings(await services.getHostBookings());
        } catch (err) {
            console.error("Error fetching host bookings:", err);
        }
    };

    const fetchPrevBookings = async () => {
        try {
            setBookings(await services.getPrevious());
        } catch (err) {
            console.error("Error fetching previous bookings:", err);
        }
    }


    useEffect(() => {

        if (pageState === "host") {
            fetchHostBookings()
        } else if (pageState === "guest") {
            fetchBookings()
        } else if (pageState === "past") {
            fetchPrevBookings()
        }

    }, [isHost, pageState]);


    useEffect(() => {

        if (location.pathname.includes("host")) {
            setIsHost(true)
            setPageState("host")
        } else if (location.pathname.includes("guest")) {
            setIsHost(false)
            setPageState("guest")
        } else if (location.pathname.includes("past")) {
            setIsHost(false)
            setPageState("past")
        }

    }, [location.pathname])

    // TODO: Your Past Bookings is not showing
    return (
        <main className="max-w-5xl mx-auto p-6 mt-10 ">
            <h1 className=" text-3xl font-semibold mb-6  mt-6 text-center">
                {isHost ? "Host Bookings" : (pageState === "guest" ? ("Your Upcoming Bookings") : ("Your Past Bookings"))}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {bookings.map((booking) => (
                <div
                key={booking.id}
                className="rounded-lg bg-white shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                    <h2 className="text-xl font-medium mb-2">{booking.prop.title}</h2>

                    <p className="text-textColor mb-4">
                        <strong>Guest:</strong> {booking.guest.username}
                    </p>

                    <div className="text-sm text-textColor space-y-2">
                        <p>
                        <strong>Check-in:</strong>{" "}
                        {new Date(booking.check_in_date).toLocaleDateString()}
                        </p>
                        <p>
                        <strong>Check-out:</strong>{" "}
                        {new Date(booking.check_out_date).toLocaleDateString()}
                        </p>
                        <p>
                        <strong>Total Price:</strong> ${booking.total_price.toFixed(2)}
                        </p>
                        <p>
                        <strong>Number of Guests:</strong> {booking.number_of_guests}
                        </p>
                        {!isHost && (
                        <p>
                            <strong>Credit Card:</strong> **** **** ****{" "}
                            {booking.credit_card.toString().slice(-4)}
                        </p>
                        )}
                    </div>
                    
                    <button
                        className="mt-4 bg-buttonColor text-whiteColor py-2 px-4 rounded hover:bg-alternativeColor transition-colors"
                        onClick={() => navigate(`/listing/${booking.prop.id}/booking/${booking.id}`)}
                    >
                        View Booking
                    </button>
                </div>
            ))}
            </div>
        </main>
    );
};

/* --------------------------------Exports--------------------------------*/

export default Bookings
