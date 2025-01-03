/* --------------------------------Imports--------------------------------*/

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import ListingCard from "./ListingCard.jsx"

import services from "../services/index.js"

/* --------------------------------Component--------------------------------*/

const MyBookingsListings = ({ isHost }) => {

    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [myProperties, setMyProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUpcomingBookings = async () => {
        try {
            setUpcomingBookings(await services.getUpcoming())
        } catch (error) {
            console.error("Error fetching upcoming bookings:", error)
        }
    }

    const fetchHostData = async () => {

        try {

            const properties = await services.getMyProperties()

            setMyProperties(
                properties.map((prop) => ({
                    id: prop.id,
                    prop,
                }))
            );

            setLoading(false)

        } catch (error) {
            console.error("Error fetching host data:", error);
        }

    };

    useEffect(() => {

        if (!isHost) fetchUpcomingBookings()
        if (isHost) fetchHostData()

    }, [isHost])


    return (
        <>
            {isHost ? (
                <div className="dashboard-center">
                    <Link to="/mylistings" className="text-lightTextColor">Your Active Listings</Link>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            myProperties.length > 0 ? (
                                myProperties.map((property) => (
                                    <ListingCard key={property.id} listing={property.prop} bookingId={null} origin={"dashboard-host"} />
                            ))
                        ) : (
                            <p>No active listings.</p>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="dashboard-center">
                    <Link to="/bookings/guest" className="classic-link text-lightTextColor">Your Upcoming Bookings</Link>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {upcomingBookings.length > 0 ? (
                            upcomingBookings.map((booking, i) => {
                                return <ListingCard 
                                bookingId={booking.id} 
                                listing={booking.prop} 
                                origin={"dashboard"}
                                key={i}
                                booking={booking} />
                            })
                        ) : (
                            <p>No upcoming bookings.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

/* --------------------------------Exports--------------------------------*/

export default MyBookingsListings