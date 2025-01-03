/* --------------------------------Imports--------------------------------*/

import { Routes, Route } from "react-router-dom";

import About from "./app/About.jsx";
import BookingForm from "./components/BookingForm";
import Bookings from "./app/Bookings.jsx";
import Dashboard from "./app/Dashboard.jsx";
import Landing from "./app/Landing";
import Listings from "./app/Listings";
import ListingForm from "./app/ListingForm";
import SingleListingBooking from "./app/SingleListingBooking.jsx";

/* --------------------------------Component--------------------------------*/

function AppRoutes() {

    return (
        <Routes>

            {/* separating routes that needs authenticaiton vs public */}
            {/* NOTE: this needs to get changed once we have services file adding {user &&()} */}
            <Route path="/booking-form" element={<BookingForm />} />
            <Route path="/booking-form/:bookingId" element={<BookingForm />} />

            <Route path="/bookings/guest" element={<Bookings />} />
            <Route path="/bookings/host" element={<Bookings />} />
            <Route path="/bookings/guest/past" element={<Bookings />} />

            <Route path="/dashboard/host" element={<Dashboard />} />
            <Route path="/dashboard/guest" element={<Dashboard />} />
            
            <Route path="/listing-form" element={<ListingForm />} />
            <Route path="/listing-form/:listingId" element={<ListingForm />} />

            <Route
                path="/listing/:listingId/owner"
                element={<SingleListingBooking />}
            />
            <Route path="/listing/:listingId/booking/:bookingId" element={<SingleListingBooking />} />
            <Route path="/listing/:listingId" element={<SingleListingBooking />} />

            <Route path="/listings" element={<Listings />} />

            {/*these are currently public paths*/}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />


        </Routes>
    );
}

/* --------------------------------Exports--------------------------------*/

export default AppRoutes