<template>
  <div id="app">
    <HomePage />

    <!-- <FooterComp /> -->
    <footer-comp />
  </div>
</template>

<script>
import HomePage from "./pages/HomePage.vue";
import FooterComp from "./components/FooterComp.vue";

export default {
  name: 'App',
  components: {
    // HelloWorld,
    HomePage,
    FooterComp,
  },
}
</script>

<style></style>
