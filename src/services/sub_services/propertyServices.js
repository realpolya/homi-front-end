/* --------------------------------Imports--------------------------------*/

import api from './apiConfig.js';

/* --------------------------------Functions--------------------------------*/

const getProperties = async () => {
    try {
        const response = await api.get('properties/');
        console.log(response)
        return response.data
    } catch (err) {
        console.log(err.response.data.error);
        throw err
    }
}

/* --------------------------------Exports--------------------------------*/

export { getProperties };