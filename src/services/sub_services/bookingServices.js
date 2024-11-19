/* --------------------------------Imports--------------------------------*/

import api from './apiConfig.js';

/* --------------------------------Functions--------------------------------*/


const getBookings = async () => {

    try {

        console.log('services: getting my bookings')
        const response = await api.get('bookings/')
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}


const getUpcoming = async () => {

    try {

        console.log('services: getting my upcoming bookings')
        const response = await api.get('bookings/upcoming/')
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}

// TODO: create a new booking
const postBooking = async (prop_id, formData) => {

    try {

        console.log('services: creating a new booking')
        const response = await api.post(`bookings/new/${prop_id}/`, formData)
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}

// TODO: retrieve one booking
const getSingleBooking = async (id) => {

    try {

        console.log('services: retrieving one booking with id ', id)
        const response = await api.get(`bookings/${id}/`)
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}

// TODO: update one booking

// TODO: delete one booking

// TODO: host's bookings

// TODO: property's bookings 

/* --------------------------------Exports--------------------------------*/

export { 
    getBookings,
    getUpcoming,
    postBooking,
    getSingleBooking,
};