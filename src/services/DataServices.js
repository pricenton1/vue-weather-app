import * as httpCommon from "./http-common";


export const GetWeather = async (city) => {
    return await httpCommon.APIData.get("",{
        params:{
            q : city
        }
    })
}

export const GetCities = async (cityName) =>{
    return await httpCommon.APICity.get("",{
        params:{
            name:cityName
        }
    })
}

// export default {GetWeather,GetCities};


