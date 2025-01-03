/* --------------------------------Imports--------------------------------*/

import { useContext, useEffect, useState, useRef } from 'react';

import { AppContext } from '../App.jsx';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

/* --------------------------------Variables--------------------------------*/

const MAPBOX_KEY = import.meta.env.VITE_MAPBOX_KEY;
const mapboxStyle = 'mapbox://styles/polinastepanova/clgsbvw0q001l01qm6uwhceyp/draft'

/* --------------------------------Component--------------------------------*/

const LandingMap = () => {

    mapboxgl.accessToken = MAPBOX_KEY;

    const { properties } = useContext(AppContext)

    const landingMapRef = useRef(null)

    const [loading, setLoading] = useState(true)
    const [markers, setMarkers] = useState([])


    useEffect(() => {

        if (properties) {

            if (properties.length > 0) {

                let markerCollection = []
                properties.forEach(property => {

                    if (property.address) {

                        let newMarker = {
                            latitude: property.address.latitude,
                            longitude: property.address.longitude
                        }
                        markerCollection.push(newMarker)

                    }

                })

                setMarkers(markerCollection)

            }

        }

    }, [properties])


    useEffect(() => {

        if (!landingMapRef.current) {
            console.log('map container is not available at the moment')
            return;
        }

        setLoading(false)
        
        const map = new mapboxgl.Map({
            container: landingMapRef.current,
            style: mapboxStyle,
            center: [-98.5795, 39.8283], // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 2.7
        });

        
        if (markers.length > 0) {

            markers.forEach(marker => {
                // Create a custom HTML element for the marker
                const el = document.createElement('div');
                el.style.backgroundImage = `url('/marker.png')`; // Set the PNG image
                el.style.backgroundSize = 'contain'; // Ensure the image fits
                el.style.width = '40px'; // Set marker width
                el.style.height = '40px'; // Set marker height
        
                // Add the custom marker to the map
                new mapboxgl.Marker(el, { offset: [0, -20] })
                    .setLngLat([marker.longitude, marker.latitude])
                    .addTo(map);
            });

        }



        return () => map.remove();

    }, [landingMapRef, MAPBOX_KEY, markers])


    return (

        <div className="w-full lg:h-[90%] h-[100%]">
            { loading && (<p>No map yet</p>)}

            <div ref={landingMapRef} 
            className="rounded-lg w-full h-full"
            ></div>
        </div>

    )
}

/* --------------------------------Exports--------------------------------*/

export default LandingMap
