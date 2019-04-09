<template>
    <div class="vmdb-home">
      <vmdb-hero-image></vmdb-hero-image>
      <vmdb-search-bar></vmdb-search-bar>
      <vmdb-home-grid></vmdb-home-grid>
    </div>
</template>

<script>
import HeroImage from './HeroImage.vue';
import SearchBar from './SearchBar.vue';
import HomeGrid from './HomeGrid.vue';

export default {
  name: 'app',
  components: {
    'vmdbHeroImage': HeroImage,
    'vmdbSearchBar': SearchBar,
    'vmdbHomeGrid': HomeGrid
  },
  created () {
    this.$store.dispatch('fetchPopular', {});
  }
};
</script>
