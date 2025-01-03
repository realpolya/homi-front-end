/* --------------------------------Imports--------------------------------*/

import { Link } from "react-router-dom"

/* --------------------------------Component--------------------------------*/

const HostBookings = ({ hostBookings }) => {

    return (
        <div className="max-w-md mx-auto mt-5 flex flex-col space-y-4">
            
            {hostBookings.length > 0 ? (

                hostBookings.map((booking) => (
                    <Link
                    to={`/listing/${booking.prop.id}/booking/${booking.id}`}
                    key={booking.id}
                    className="border text-left border-[0.5px] border-gray-300 
                    transition-transform transform 
                    active:scale-95 hover:bg-backgroundColor bg-cardColor rounded-lg p-4 shadow-sm"
                    >
                        <h2 className="text-lg font-semibold mb-2">
                            {booking.prop.title}
                        </h2>
                        <p className="text-logoColor">
                            Booked by: <strong>{booking.guest.first_name}</strong>
                        </p>
                        <p className="text-logoColor">
                            {new Date(booking.check_in_date).toLocaleDateString()} to{" "}
                            {new Date(booking.check_out_date).toLocaleDateString()}
                        </p>
                    </Link>
                ))
            ) : (
                <p>No bookings for your listings.</p>
            )}
            
        </div>
    );
};

/* --------------------------------Exports--------------------------------*/

export default HostBookings