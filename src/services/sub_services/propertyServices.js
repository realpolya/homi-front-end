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
const postProperty = async (formData) => {

    try {

        console.log('services: creating new property')
        const response = await api.post('properties/', formData)
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}


const getMyProperties = async () => {

    try {

        console.log('services: getting my properties')
        const response = await api.get('properties/mine/')
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}


const getMyArchived = async () => {

    try {

        console.log('services: getting my archived properties')
        const response = await api.get('properties/mine/archived/')
        return response.data

    } catch (err) {

        console.log(err.response.data.error);
        throw err

    }

}

// TODO: getUserProperties

// TODO: getSingleProperty

// TODO: putProperty (achiving properties is included here)


/* --------------------------------Exports--------------------------------*/

export { 
    getProperties,
    postProperty,
    getMyProperties,
    getMyArchived
};