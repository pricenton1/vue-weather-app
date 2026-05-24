<template>
  <!-- 
    1. Menggunakan min-h-screen agar background tidak terpotong di HP jika konten memanjang.
    2. Menghapus md:bg-repeat agar GIF tidak berulang (patah-patah) di monitor lebar.
  -->
  <div 
    class="w-full min-h-screen bg-contain bg-no-repeat bg-center bg-slate-900 flex flex-col justify-between p-4 md:p-8" 
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="w-full flex flex-col gap-6">
      <!-- Bagian Atas / Konten Utama -->
      <!-- Di HP (default) otomatis flex-col (menyusun ke bawah), di Laptop (md:) menjadi flex-row (ke samping) -->
      <div class="flex flex-col md:flex-row gap-6 justify-between items-start w-full">
      
        <!-- Bagian 1: Waktu, Tanggal & Icon -->
        <!-- Di HP makan lebar penuh (w-full), di Laptop hanya makan 1/4 bagian (md:w-1/4) -->
        <div class="w-full md:w-1/4 bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex flex-col items-center md:items-start">
          <div class="text-center md:text-left mb-3">
            <p class="text-stone-50 font-semibold underline decoration-lime-500 text-lg md:text-xl">{{ time }}</p>
            <p class="text-stone-50 font-semibold underline decoration-blue-400 text-sm md:text-base mt-1">{{ date }}</p>
          </div>

          <!-- Membuat icon responsif (mengecil di HP, ukuran normal di Laptop) -->
          <img 
            class="w-32 md:w-48 transition-all duration-300" 
            :src="require(`../assets/images/icons/${dayNight}.svg`)" 
            alt="iconDayNight"
          >
        </div>

        <!-- Bagian 2 & 3: Spacer Kosong (Dioptimalkan agar tidak merusak layout HP) -->
        <div class="hidden md:block flex-1"></div>
      
        <!-- Bagian 4: Card Weather -->
        <!-- Di HP selebar layar, di Laptop mengambil porsi maksimal 1/3 layar -->
        <div class="w-full md:w-1/3">
            <CardComp v-if="dataWeather.cod === 200" />
            <!-- p v-else kosong dihapus untuk menghemat render DOM -->
        </div>
      </div> 

      <!-- Bagian Bawah: Form Pencarian -->
      <!-- Ditaruh di paling bawah container dengan margin top otomatis jika di HP -->
      <div class="w-full md:mt-4 flex justify-center">
        <FormComp class="w-full max-w-md" />
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
        show:false,
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
    },
    computed:{
      dataWeather(){
        return this.$store.getters.getData;
      },
      dayNight() {
        let d = new Date();
        let hours = d.getHours();
        if (hours >= 6 && hours <= 15) return 'Day';
        if (hours >= 16 && hours <= 18) return 'Sunset';
        return 'Night';
      },
      skyRender() {
        if (this.dayNight === 'Night') {
          return `bg-[url('../assets/images/stars.png')]`;
        }
        return `bg-[url('../assets/images/cloud.png')]`;
      },
      bgColor() {
        if (this.dayNight === 'Night') {
          return 'bg-slate-800';
        }
        return '';
      },
      bgImage() {
        // Ambil status cuaca utama (misal: 'Clouds', 'Rain', 'Clear')
        // Berikan fallback jika dataWeather belum terisi saat pertama kali render
        const mainWeather = this.dataWeather?.weather?.[0]?.main || 'Clouds';
        const hours = new Date().getHours();

        // Kondisi SIANG atau SUNSET (Jam 06.00 - 18.00)
        if (hours >= 6 && hours <= 18) {
          if (mainWeather === "Rain") {
            return require(`../assets/images/cityRainyDay.webp`);
          }
          // Default jika cerah atau berawan (Clouds)
          return require(`../assets/images/cityCloudyDay.webp`);
        } 
        
        // Kondisi MALAM HARI
        else {
          if (mainWeather === "Rain") {
            return require(`../assets/images/cityRainyNight.webp`);
          }
          // Default malam hari jika berawan atau cerah
          return require(`../assets/images/cityCloudyNight.webp`);
        }
      },
    },
    async created(){
      await this.$store.dispatch("fetchData", "Jakarta")
      this.getTime();
      this.getDate();
    }
}
</script>

<style lang="postcss">


</style>