import axios from "axios";

const apiKey = "109f188e595b16ec3ba8282931fc3c60"; 
export const APIData = axios.create({
    baseURL:`https://api.openweathermap.org/data/2.5/weather`,
    // headers:{
    //     'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
    //     'X-RapidAPI-Key': '1b5133b3d3msh3c8dab155dc997ap14c8e1jsn0db4fd42710b'
    // },
    params:{
        q: String,
        appid: apiKey
    },  
})


const apiKeyCity = "8hUu5fIezDEYEBWWiqZxPA==O41WhKwZfca72ZC2"
export const APICity = axios.create({
    baseURL:`https://api.api-ninjas.com/v1/city`,
    headers:{
        'X-Api-Key':apiKeyCity,
    },
    params:{
        name:'',
        limit:5
    } 
})

// export default {APIData,APICity};