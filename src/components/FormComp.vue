<template>
  <div class="container-xl mx-auto">
    <div class="block max-w-lg rounded-lg mx-auto">
      <form class="mx-auto flex">
        <v-select
          class="vselect"
          placeholder="Search for city"
          v-model="selectedCity"
          @search="onSearch"
          :options="getCities"
          label="name"
          :filterable="false"
        >
          <template slot="no-options">type to search for weather..</template>
          <template slot="option" slot-scope="option">
            <div class="d-center">{{ option.name }}</div>
          </template>
          <template slot="selected-option" slot-scope="option">
            <div class="d-center">
              <div class="d-center">{{ option.name }}</div>
            </div>
          </template>
        </v-select>

        <button
          class="submit bg-slate-50"
          :class="selectedCity==='' ? 'btn-disabled' : 'btn-active'"
          type="submit"
          :disabled="selectedCity===''"
          @click.prevent="findCity"
        >
          Search
        </button>
      </form>

    </div>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";


export default {
  name: "FormComp",
  data() {
    return {
      selectedCity: "",
      disabled:true,
    };
  },
  methods: {
    onSearch(search, loading) {
      if (search.length) {
        loading(true);
        this.search(loading, search, this);
      }
    },
    search(loading, search) {
      this.$store.dispatch("fetchCities", search);
      loading(false);
      
    },
    findCity() {
      this.$store.dispatch("fetchData", this.selectedCity.name);
      this.selectedCity = "";
    },
  },
  computed: {
    getCities() {
      return this.$store.getters.getCities;
    },
  },
};
</script>

<style lang="postcss">
.vselect {
  @apply w-3/4 h-12 mr-2 inline-block  ;
}
.vselect .vs__search::placeholder,
.vselect .vs__dropdown-toggle {
  @apply w-auto h-12 border-2 rounded-md text-neutral-400 bg-slate-50;
}

.vselect .vs__search::placeholder,
.vselect .vs__dropdown-toggle:hover {
  @apply border-cyan-500;


}

.btn-disabled {
  @apply w-24 h-12 rounded-md border-solid border-2 text-gray-300 ;
}

.btn-active {
  @apply w-24 h-12 rounded-md border-solid border-2 border-cyan-500 text-gray-900;
}

.btn-active:hover{
  @apply bg-teal-50 shadow-2xl shadow-cyan-500/50;
}

</style>
