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


// TODO: view upcoming bookings

// TODO: create a new booking

// TODO: retrieve one booking

// TODO: update one booking

// TODO: delete one booking

// TODO: host's bookings

// TODO: property's bookings 

/* --------------------------------Exports--------------------------------*/

export { getBookings };