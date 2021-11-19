import axios from 'axios';

export const getFilterData = async (filterUrl) => {
    try {
       const response = await  axios.get(filterUrl)
       if( response?.data ) return response.data
       return "No result found!"
    } catch (error) {
        console.log("checking error", error );
    }
}

export const getItemData = async (itemUrl) => {
    try {
       const response = await  axios.get(itemUrl)
       if( response?.data ) return response.data
       return "No result found!"
    } catch (error) {
        console.log("checking error", error );
    }
}