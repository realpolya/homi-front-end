/* --------------------------------Imports--------------------------------*/

import api from './apiConfig.js';

/* --------------------------------Functions--------------------------------*/

const getProperties = async (query=null) => {
    try {

        let response = undefined;

        // passing queries in url and into the function
        if (query) {

            console.log('services: query for getProperties', query)
            response = await api.get(`properties/?${query}`);
        
        // general retrieval of all properties
        } else {

            console.log('services: no query for getProperties')
            response = await api.get('properties/');

        }

        console.log(response.data)
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }
}

// TODO: postProperty

// TODO: getMyProperties

// TODO: getMyArchived

// TODO: getUserProperties

// TODO: getSingleProperty

// TODO: putProperty (achiving properties is included here)


/* --------------------------------Exports--------------------------------*/

export { getProperties };