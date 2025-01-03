/* --------------------------------Imports--------------------------------*/

import { useContext, useEffect, useState } from 'react';

import { SingleContext } from '../app/SingleListingBooking.jsx';

/* --------------------------------Variables--------------------------------*/

const PROPERTY_TYPE = {
    'EN': 'Entire Place',
    'PR': 'Private Room',
    'SH': 'Shared Room',
    'VA': 'Vacation Home',
    'LO': 'Loft',
    'HO': 'Hostel',
    'MA': 'Mansion',
    'VI': 'Villa',
    'CA': 'Castle',
    'LU': 'Luxury Apartment',
}

/* --------------------------------Component--------------------------------*/

const ListingDescription = () => {

    const { listing } = useContext(SingleContext);

    const [isExpanded, setIsExpanded] = useState(false);
    const [info, setInfo] = useState({
        max_guests: 'still loading...',
        cancellation_policy: 'still loading...',
        description: 'still loading...',
        cleaning_fee: 'still loading...',
        property_type: 'still loading...'
    }) 

    const toggleDescription = () => setIsExpanded(!isExpanded);

    useEffect(() => {

        if (listing) {

            setInfo({
                max_guests: listing.max_guests,
                cancellation_policy: listing.cancellation_policy,
                description: listing.description,
                cleaning_fee: listing.cleaning_fee,
                property_type: listing.property_type
            })

        }

    }, [listing])


    return (
        <div className="w-1/2 text-sm text-gray-700 space-y-4">
            <ul className="space-y-2 text-left text-md">
                <li>Max Guests: <span className="text-logoColor font-semibold">{info.max_guests}</span></li>
                <li>Property Type: <span className="text-logoColor font-semibold">{PROPERTY_TYPE[info.property_type]}</span></li>
                <li>Cancellation Policy: <span className="text-logoColor font-semibold">{info.cancellation_policy}</span></li>
                <li>Cleaning fee: <span className="text-logoColor font-semibold">${info.cleaning_fee}</span></li>
            </ul>
            
            <p className="text-left text-lg">
                {isExpanded
                    ? info.description
                    : `${info.description.slice(0, 60)}...`}
                
                <span onClick={toggleDescription} className="text-teal-500 cursor-pointer">
                    {isExpanded ? " see less" : " see more"}
                </span>
            </p>
        </div>
    );
    
};

/* --------------------------------Exports--------------------------------*/

export default ListingDescription