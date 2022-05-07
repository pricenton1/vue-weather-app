<template>
  <div class="container-xl">
      <h1 
        class="font-sans text-4xl font-bold tracking-wide text-blue-500 text-center"
        :class="[bgColor]"
      >
        WEATHER APP
      </h1>
      
      <section 
        class="flex w-auto h-48 mx-auto "
        :class="[bgColor]"
      > 
  
          <div 
            class="flex-initial w-3/4 h-40 bg-contain"
            :class="[skyRender]"
          >            
          </div>
          
          <div class="flex-initial w-1/4 rounded-md">
              <div class="p-1">
                <p class="ml-5 text-blue-500 font-semibold underline decoration-lime-700">{{time}}</p>
                <p class="ml-5 text-blue-500 font-semibold underline decoration-blue-900">{{date}}</p>

              </div>

              <img 
                class="w-48" 
                :src="require(`../assets/images/icons/${dayNight}.svg`)" 
                alt="iconDayNight"
              >
          </div>

      </section>

      <FormComp :class="[bgColor]" />

      <div class="container-xl" :class="[bgColor]">
        <div 
          class="w-full h-80 bg-repeat-x bg-auto bg-left bg-clip-content bg-[url('../assets/images/city.png')]"      
        >
          <CardComp v-if="dataWeather.cod === 200"  />
          <p v-else></p>
        </div>
      </div>

  </div>
</template>
<script>
import FormComp from "../components/FormComp.vue";
import CardComp from "../components/CardComp.vue";


export default {
    name: "HomePage",
    components:{
      FormComp,
      CardComp,
    },
    data(){
      return{
        time:"",
        date:"",
        dayNight:"",
        skyRender:"",
        bgColor:"",
        show:false
      }
    },
    methods:{
      getTime(){
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // hour 0 should be 12
        minutes = minutes < 10 ? '0'+minutes : minutes;
        this.time = hours + ':' + minutes + ' ' + ampm;
      },
      getDate(){
        let d = new Date();
        let date = d.toDateString();
        this.date = date;
      },
      getDayNight(){
        let d = new Date();
        let hours = d.getHours();
        if (hours >= 6 && hours <= 15){
          this.dayNight = 'Day';
          this.skyRender = `bg-[url('../assets/images/cloud.png')]`;
        } else if (hours >= 16 && hours <= 18){
          this.dayNight = 'Sunset';
          this.skyRender = `bg-[url('../assets/images/cloud.png')]`;
        } else {
          this.dayNight = 'Night';
          this.skyRender = `bg-[url('../assets/images/stars.png')]`;
          this.bgColor = 'bg-slate-800';
        }
      }
    },
    computed:{
      dataWeather(){
        return this.$store.getters.getData;
      },
    },
    created(){
      this.getTime();
      this.getDate();
      this.getDayNight();
    }
}
</script>

<style lang="postcss">


</style>