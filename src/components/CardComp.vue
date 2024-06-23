<template>
  <div class="md:mx-auto w-4/5 h-max p-2 border-solid border-2 rounded-lg shadow-lg bg-white">
    <!-- <h1>{{dataWeather}}</h1> -->
    <p class="font-sand font-bold text-xl text-left">
      Current Weather
    </p>
    <p class="font-sand font-bold text-xl text-center">
      {{ dataWeather.name }}
    </p>

    <div class="flex flex-col md:flex-row justify-around w-full h-max p-4">
      <!-- Temperature Section -->
      <div class="flex flex-col items-center md:basis-1/4 md:mb-0">
        <p class="font-sans text-lg font-bold">Temperature</p>
        <div class="flex items-center">
          <img class="w-16 sm:w-12 xl:w-32" :src="require('../assets/images/icons/thermometer.svg')" alt="thermometer">
          <p class="text-xl sm:text-2xl xl:text-3xl font-sans font-bold ml-2">{{ tempCelcius }}<span>&#176;</span>C</p>
        </div>
      </div>

      <!-- Weather Icon Section -->
      <div class="flex flex-col items-center md:basis-1/4 sm:mb-2">
        <img class="w-24 h-24 sm:w-32 sm:h-24 xl:w-full xl:h-32"
          :src="require(`../assets/images/icons/${dataWeather.weather[0].main}.svg`)" alt="iconWeather">
        <p class="font-sans font-bold text-3xl">{{ dataWeather.weather[0].main }}</p>
      </div>

      <!-- Wind Speed and Humidity Section -->
      <div class="flex flex-col items-center md:basis-1/4">
        <div class="flex flex-col items-center">
          <p class="font-sans text-md font-bold">Wind Speed</p>
          <div class="flex items-center -mt-2">
            <img class="w-16 sm:w-12 xl:w-24" :src="require('../assets/images/icons/wind.svg')" alt="wind">
            <p class="text-xl sm:text-lg xl:text-2xl font-sans font-bold ml-2">{{ dataWeather.wind.speed }} Km/h</p>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <p class="font-sans text-md font-bold">Humidity</p>
          <div class="flex items-center -mt-2">
            <img class="w-16 sm:w-12 xl:w-24" :src="require('../assets/images/icons/raindrop.svg')" alt="humidity">
            <p class="text-xl sm:text-lg xl:text-2xl font-sans font-bold ml-2">{{ dataWeather.main.humidity }}%</p>
          </div>
        </div>
      </div>

    </div>
    <!-- forecast 5 days -->
    <div class="flex flex-col md:flex-row justify-around w-full h-max p-2">
      <div class="flex flex-col items-center md:basis-1/5 md:mb-1" v-for="(value, index) in listForecast" :key="index">
        <p class="font-bold">{{ value.dt_txt }}</p>
        <img class="w-16 sm:w-12 xl:w-24" :src="`http://openweathermap.org/img/w/${value.weather[0].icon}.png`" alt="iconWeather2">
        <p>{{ value.weather[0].description }}</p>
        <p>{{ Math.round(value.main.temp) }}<span>&#176;</span>C</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CardComp",
  data() {
    return {
      city: this.$store.state.dataWeather.name,
      listForecast: this.$store.state.listWeatherForecast,
    }
  },
  methods: {
  
  },
  computed: {
    // get data weather from store vuex
    dataWeather() {
      return this.$store.getters.getData;
    },
    tempCelcius() {
      return Math.round(this.dataWeather.main.temp - 273.15)
    },
  },
  created() {

  },
  mounted(){
    // this.dataListWeather();
  }
};
</script>

<style></style>
