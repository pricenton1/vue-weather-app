import Vue from "vue";
import Vuex from "vuex";
import * as service from "../services/DataServices";
import { listCity } from "./constan";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataWeather: {},
    cities: listCity,
    displayCity : [],
  },
  getters: {
    getData(state) {
      return state.dataWeather;
    },
    getCities(state) {
      return state.displayCity;
    },
  },
  actions: {
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
    //   service
    //     .GetCities(cityName)
    //     .then((response) => {
    //       commit("SET_CITIES", response.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
      const cities = this.state.cities
      const newCities =  cities.filter(city => city.toLowerCase().includes(cityName));
      commit("SET_CITIES", newCities);
    },
  },
  mutations: {
    SET_DATA(state, dataWeather) {
      state.dataWeather = dataWeather;
    },
    SET_CITIES(state, cities) {
      state.displayCity = cities;
    },
  },
});
