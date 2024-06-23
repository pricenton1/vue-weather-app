import Vue from "vue";
import Vuex from "vuex";
import * as service from "../services/DataServices";
import Swal from "sweetalert2";
import { getDay } from "@/utility/getDay";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listWeatherForecast: [],
    dataWeather: {},
    cities: [],
  },
  getters: {
    getListWeatherForecast(state) {
      return state.listWeatherForecast;
    },
    getData(state) {
      return state.dataWeather;
    },
    getCities(state) {
      return state.cities;
    },
  },
  actions: {
    fetchListWeatherForecast({ commit }, city) {
      Swal.showLoading();
      service
        .GetWeatherForecast(city)
        .then((response) => {
          setTimeout(() => {
            // Filter forecasts to only include data for 12:00:00 each day
            const dailyForecasts = response.data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));
            dailyForecasts.map((item => {  
             const newDay =  getDay(item.dt_txt)
             item.dt_txt = newDay
            }))
            commit("SET_WEATHER_FORECAST", dailyForecasts); 
          }, 2000);
        })
        .catch((err) => {
          // console.log(err);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "error",
            title: err.message,
          });
        });
    },
    fetchData({ commit }, city) {
      Swal.showLoading();
      service
        .GetWeather(city)
        .then((response) => {
          setTimeout(() => {
            commit("SET_DATA", response.data);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-start",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Weather was found",
            });
          }, 2000);
        })
        .catch((err) => {
          // console.log(err);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "error",
            title: err.message,
          });
        });
    },
    fetchCities({ commit }, cityName) {
      service
        .GetCities(cityName)
        .then((response) => {
          commit("SET_CITIES", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mutations: {
    SET_WEATHER_FORECAST(state, listWeather) {
      state.listWeatherForecast = listWeather
    },
    SET_DATA(state, dataWeather) {
      state.dataWeather = dataWeather;
    },
    SET_CITIES(state, cities) {
      state.cities = cities;
    },
  },
});
