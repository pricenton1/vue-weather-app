import axios from "axios";

const apiKey = process.env.VUE_APP_API_KEY_WEATHER; 
export const APIData = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL_WEATHER,
    params:{
        q: String,
        appid: apiKey
    },  
})


const apiKeyCity = process.env.VUE_APP_API_KEY_CITY
export const APICity = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL_CITY,
    headers:{
        'X-Api-Key':apiKeyCity,
    },
    params:{
        name:'',
        limit:5
    } 
})

// export default {APIData,APICity};