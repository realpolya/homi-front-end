/* --------------------------------Imports--------------------------------*/

import api from './apiConfig.js';

/* --------------------------------Functions--------------------------------*/

const getProperties = async (query=null) => {
    try {
        console.log('inside get properties')
        let response = undefined;
        if (query) {
            console.log('services: query for getProperties', query)
            response = await api.get(`properties/?${query}`);
        } else {
            console.log('services: no query for getProperties')
            response = await api.get('properties/');
        }
        console.log(response)
        return response.data
    } catch (err) {
        console.log(err.response.data.error);
        throw err
    }
}

// TODO: 

/* --------------------------------Exports--------------------------------*/

export { getProperties };