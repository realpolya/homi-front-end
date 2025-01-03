/* --------------------------------Imports--------------------------------*/

import { useEffect, useState, useContext } from "react";
import { useLocation } from 'react-router-dom';

import { AppContext } from "../App.jsx";

import ListingCard from "../components/ListingCard.jsx";
import SortBar from "../components/SortBar.jsx";

import services from "../services/index.js"

/* --------------------------------Component--------------------------------*/

const Listings = () => {

    const { properties } = useContext(AppContext)

    let location = useLocation()

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState(true);
    const [searchData, setSearchData] = useState('')


    const fetchWhereData = async (data) => {

        const query = `where=${data}`
        setListings(await services.getProperties(query))

    }


    useEffect(() => {

        if (!sorting) {
            setListings(properties);
            setSearchData('');
            setLoading(false);
        }

    }, [sorting, properties])


    useEffect(() => {

        if (location.state) {
            setSearchData(location.state.whereData)
            setSorting(true)
        } 

    }, [location.state])


    // fetch or do initial load
    useEffect(() => {

        if (searchData.length > 0) {

            fetchWhereData(searchData);
            setLoading(false);
            
        }
        else if (properties) {

            setListings(properties);
            setLoading(false);

        }

    }, [location.pathname, properties, searchData]);


    return (

        <main className="listings-main size-fit">
            <h1 className="text-left pl-4 mb-6 mt-24 md:mt-12 lg:mt-0
            text-2xl">All Listings</h1>

            <SortBar setListings={setListings} setSorting={setSorting}/>

            {
            loading ? (
                <p>No properties yet...</p>
            ) : (
                <div className="listing-cards-container flex flex-row flex-wrap justify-center">
                {listings.length === 0 ? (
                    <p>No listings matched your criteria...</p>
                ) : (
                    listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} origin={"listings"} bookingId={null} />
                    ))
                )}
                </div>
            )
            }
            
        </main>

    );
};

/* --------------------------------Exports--------------------------------*/

export default Listings