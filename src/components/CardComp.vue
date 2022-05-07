<template>
  <div class="container mx-auto p-2 border-solid border-2 rounded-lg shadow-lg bg-white">
    <!-- <h1>{{dataWeather}}</h1> -->
    <p class="font-sand font-bold text-xl text-left">
      Current Weather
    </p>
    <p class="font-sand font-bold text-3xl text-center">
      {{ dataWeather.name }}
    </p>

    <div class="flex justify-around w-full h-40">
      <div class="basis-1/4">
        <div class="flex justify-around">
          <img class="xl:w-32 sm:w-12" :src="require(`../assets/images/icons/thermometer.svg`)" alt="themometer">
          <p class="basis-1/2 xl:text-3xl font-sans font-bold my-auto sm:text-2xl">{{tempCelcius}}<span>&#176;</span>C</p>
        </div>
      </div>

      <div class="basis-1/4">
        <img
          class="xl:w-screen xl:h-32 sm:w-32 sm:h-24"
          :src="
            require(`../assets/images/icons/${dataWeather.weather[0].main}.svg`)
          "
          alt="iconWeather"
        />
        <p class="font-sand font-bold text-3xl text-center">{{dataWeather.weather[0].main}}</p>
      </div>

      <div class="basis-1/4">
        <div class="flex justify-around">
          <img class="xl:w-24 sm:w-12" :src="require(`../assets/images/icons/wind.svg`)" alt="">
          <p class="basis-1/2 xl:text-2xl font-sans font-bold my-auto sm:text-lg">{{dataWeather.wind.speed}}Km/h</p>
        </div>

        <div class="flex justify-around">
          <img class="xl:w-24 sm:w-12" :src="require(`../assets/images/icons/raindrop.svg`)" alt="">
          <p class="basis-1/2 xl:text-2xl font-sans font-bold my-auto sm:text-lg">{{dataWeather.main.humidity}}%</p>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CardComp",
  data(){
    return{
        city: this.$store.state.dataWeather.name,
    }
  },
  methods:{
  },
  computed: {
    dataWeather() {
      return this.$store.getters.getData;
    },
    tempCelcius(){
      return Math.round(this.dataWeather.main.temp - 273.15)
    },
  },
  created(){
   
  },
};
</script>

<style></style>
