/* --------------------------------Imports--------------------------------*/

import { useState, useEffect, useContext } from "react"
import { useLocation } from "react-router-dom"

import { AppContext } from '../App.jsx'
import { MyUserInfo } from "../components/MyUserInfo"
import { HostBookings } from "../components/MyBookingsListings"
import BookingMap from "../components/BookingMap"
import { ListingCard } from "../components/ListingCard"

import services from "../services/index.js"

/* --------------------------------Component--------------------------------*/

const Dashboard = () => {

    const { bookings } = useContext(AppContext)

    const location = useLocation()

    const [isHost, setIsHost] = useState(false)
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [myProperties, setMyProperties] = useState([]);
    const [hostBookings, setHostBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prevBookings, setPrevBookings] = useState([])


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

            setHostBookings(await services.getHostBookings());

        } catch (error) {
            console.error("Error fetching host data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        if (location.pathname.includes("host")) setIsHost(true)

    }, [location.pathname])


    useEffect(() => {

        if (!isHost) fetchUpcomingBookings()

        if (isHost) fetchHostData()

    }, [isHost])


    useEffect(() => {

        if (bookings) {

            let prevData = []
            bookings.forEach(booking => {

                if (booking.prop) {
                    if (booking.prop.address) {
                        let prevInstance = {
                            latitude: booking.prop.address.latitude,
                            longitude: booking.prop.address.longitude,
                            title: booking.prop.title,
                            check_in: booking.check_in_date,
                            check_out: booking.check_out_date
                        }
                        prevData.push(prevInstance)
                    }
                }

            })

            setPrevBookings(prevData);

        }

    }, [bookings])

    return (
        <main className="dashboard-main">
            {/* Left Column */}
            <div className="dashboard-left">
                <MyUserInfo isHost={isHost} />
            </div>

            {/* Middle Column */}
            {isHost ? (
                <div className="dashboard-center">
                    <p className="text-lightTextColor">Your Active Listings</p>
                    <div className="flex flex-wrap gap-4">
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
                    <p className="text-lightTextColor">Your Upcoming Bookings</p>
                    <div className="flex flex-wrap gap-4">
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

            {/* Right Column */}
            <div className="dashboard-right">
                {isHost ? (<h1>Bookings of my listings</h1>) : (<h1>Your Previous Bookings</h1>)}
                {isHost ? (<HostBookings hostBookings={hostBookings} />) : (
                    prevBookings.length > 0 ? (
                    prevBookings.map((prev, i) => {
                        return <BookingMap prev={prev} key={i}/>
                    })
                    ) : (null)
                )}
            </div>
        </main>
    );
};

/* --------------------------------Exports--------------------------------*/

export default Dashboard