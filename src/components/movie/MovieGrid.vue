<template>
    <div class="vmdb-home-grid">
      <div class="container">
        <h1 class="my-4 text-left">Actors</h1>
        <div class="row">
          <vmdb-movie-grid-item v-for="actor in actors" :actor="actor" :key="actor.id">
          </vmdb-movie-grid-item>
        </div>
      </div>
  </div>
</template>

<script>
import MovieGridItem from './MovieGridItem.vue';

export default {
  components: {
    vmdbMovieGridItem: MovieGridItem
  },
  computed: {
    actors () {
      return this.$store.getters.getActorsById(this.$route.params.id);
    }
  }
};
</script>

<style lang="scss">
  .vmdb-loadmorebtn .btn {
    font-size: 2.625em;
  }
</style>
