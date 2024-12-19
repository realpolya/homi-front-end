/* --------------------------------Imports--------------------------------*/

import { useState, useEffect, useContext } from "react"
import { Link, useLocation } from "react-router-dom"

import { AppContext } from '../App.jsx'

import MyUserInfo from "../components/MyUserInfo.jsx"
import HostBookings from "../components/HostBookings.jsx"
import MyBookingsListings from "../components/MyBookingsListings.jsx"
import BookingMap from "../components/BookingMap.jsx"

import services from "../services/index.js"

/* --------------------------------Component--------------------------------*/

const Dashboard = () => {

    const { bookings } = useContext(AppContext)

    const location = useLocation()

    const [isHost, setIsHost] = useState(false)
    const [hostBookings, setHostBookings] = useState([]);
    const [prevBookings, setPrevBookings] = useState([])

    const fetchHostData = async () => {
        try {

            setHostBookings(await services.getHostBookings());

        } catch (error) {
            console.error("Error fetching host data:", error);
        } 
    };

    useEffect(() => {

        if (location.pathname.includes("host")) setIsHost(true)
        if (location.pathname.includes("guest")) setIsHost(false)

    }, [location.pathname])


    useEffect(() => {

        if (isHost) fetchHostData()

    }, [isHost])


    // useEffect(() => {

    //     if (bookings) fetchUpcomingBookings()

    // }, [bookings])


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
            < MyBookingsListings isHost={isHost} />

            {/* Right Column */}
            <div className="dashboard-right">
                {isHost ? (<Link to="/bookings/host" className="classic-link">Bookings of my listings</Link>) : (
                    <Link to="/bookings/guest/past" className="classic-link">Your Previous Bookings</Link>
                )}
                
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