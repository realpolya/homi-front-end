/* --------------------------------Imports--------------------------------*/

import api from './apiConfig.js';

/* --------------------------------Functions--------------------------------*/


const getBookings = async () => {

    try {

        const response = await api.get('bookings/')
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}


const getUpcoming = async () => {

    try {

        const response = await api.get('bookings/upcoming/')
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}

const getPrevious = async () => {

    try {

        console.log("previous in progress")

        const response = await api.get('bookings/prev/')
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}


const postBooking = async (prop_id, formData) => {

    try {

        const response = await api.post(`bookings/new/${prop_id}/`, formData)
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}


const getSingleBooking = async (id) => {

    try {

        const response = await api.get(`bookings/${id}/`)
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}


const putBooking = async (id, formData) => {

    try {

        // console.log('services: updating booking with id ', id)
        const response = await api.put(`bookings/${id}/`, formData)
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}

const deleteBooking = async (id) => {

    try {

        // console.log('services: deleting booking with id ', id)
        const response = await api.delete(`bookings/${id}/`)
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}


const getHostBookings = async () => {

    try {

        // console.log('services: getting bookings of my properties')
        const response = await api.get('bookings/host/')
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}


const getPropBookings = async (prop_id) => {

    try {

        // console.log('services: getting bookings of property with id', prop_id)
        const response = await api.get(`bookings/prop/${prop_id}/`)
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}


/* --------------------------------Exports--------------------------------*/

export { 
    getBookings,
    getUpcoming,
    getPrevious,
    postBooking,
    getSingleBooking,
    putBooking,
    deleteBooking,
    getHostBookings,
    getPropBookings,
};