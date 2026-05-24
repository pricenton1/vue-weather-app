<template>
  <div class="p-2 border-solid border-2 rounded-lg shadow-lg backdrop-brightness-50">
    <!-- <h1>{{dataWeather}}</h1> -->
    <p class="font-sand font-bold text-xl text-left text-stone-50">
      Current Weather {{ dataWeather.name }}
    </p>

    <div class="w-full h-1/4">
      <div class="flex justify-around">
        <div class="w-1/3">
          <div class="flex">
            <img class="xl:w-1/2 sm:w-1/2" :src="require(`../assets/images/icons/thermometer.svg`)" alt="themometer">
            <p class="w-1/2 pt-3 xl:text-xl font-sans font-bold sm:text-xl text-stone-50">
              {{tempCelcius}}
              <span>&#176;</span>C
            </p>
          </div>
        </div>

        <div class="w-1/3">
          <img
            class="xl:w-28 xl:h-28 sm:w-28 sm:h-28"
            :src="require(`../assets/images/icons/${dataWeather.weather[0].main}.svg`)"
            alt="iconWeather"
          />
          <p class="font-sand font-bold text-xl text-center text-stone-50">
            {{dataWeather.weather[0].main}}
          </p>
        </div>
      </div>

      <div class="basis-1/4">
        <div class="flex justify-around">
          <img class="xl:w-24 sm:w-12" :src="require(`../assets/images/icons/wind.svg`)" alt="">
          <p class="basis-1/2 xl:text-xl font-sans font-bold my-auto sm:text-lg text-stone-50">
            {{dataWeather.wind.speed}}Km/h
          </p>
        </div>

        <div class="flex justify-around">
          <img class="xl:w-24 sm:w-12" :src="require(`../assets/images/icons/raindrop.svg`)" alt="">
          <p class="basis-1/2 xl:text-xl font-sans font-bold my-auto sm:text-lg text-stone-50">
            {{dataWeather.main.humidity}}%
          </p>  
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
