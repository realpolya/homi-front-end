/* --------------------------------Imports--------------------------------*/

import { useContext, useEffect, useState, useRef } from 'react';

import { SingleContext } from '../app/SingleListingBooking.jsx';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

/* --------------------------------Variables--------------------------------*/

const MAPBOX_KEY = import.meta.env.VITE_MAPBOX_KEY;
const mapboxStyle = 'mapbox://styles/polinastepanova/clgsbvw0q001l01qm6uwhceyp/draft'

/* --------------------------------Component--------------------------------*/

const ListingMap = () => {

    mapboxgl.accessToken = MAPBOX_KEY;

    const mapContainerRef = useRef(null)

    const { listing, pageState } = useContext(SingleContext);

    // NYC coordinates as default
    const [lat, setLat] = useState(40.7128)
    const [lng, setLng] = useState(-74.0060)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        
        if (listing && listing.address) {
            
            setLat(listing.address.latitude)
            setLng(listing.address.longitude)
            setLoading(false)

        }

    }, [listing, listing?.address, mapContainerRef, MAPBOX_KEY])


    useEffect(() => {

        if (!mapContainerRef.current) {
            console.log('map container is not available at the moment')
            return;
        }

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: mapboxStyle,
            center: [lng, lat], // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 14
        });

        const el = document.createElement('div');

        if (pageState === "listing") {

            el.style.backgroundImage = `url('/radius.png')`; // Set the PNG image
            el.style.backgroundSize = 'contain'; // Ensure the image fits
            el.style.width = '200px'; // Set marker width
            el.style.height = '200px'; // Set marker height

            new mapboxgl.Marker(el, { offset: [0, 0] })
            .setLngLat([lng, lat])
            .addTo(map);

        } else {

            el.style.backgroundImage = `url('/marker.png')`; // Set the PNG image
            el.style.backgroundSize = 'contain'; // Ensure the image fits
            el.style.width = '40px'; // Set marker width
            el.style.height = '40px'; // Set marker height

            new mapboxgl.Marker(el, { offset: [0, -20] })
            .setLngLat([lng, lat])
            .addTo(map);

        }

        return () => map.remove();

    }, [lat, lng, pageState])

    
    return (
        <div className="w-full lg:h-1/3 h-96 p-4 z-0">
            { loading && (<p>No map yet</p>)}
            <div ref={mapContainerRef} 
            className="w-full h-full rounded-lg z-0"
            ></div>
        </div>
    )
}

/* --------------------------------Exports--------------------------------*/

export default ListingMap