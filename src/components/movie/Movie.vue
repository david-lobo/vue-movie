<template>
  <div class="container-fluid px-0">
    <vmdb-navigation></vmdb-navigation>
    <vmdb-movie-info></vmdb-movie-info>
    <vmdb-movie-grid></vmdb-movie-grid>
  </div>
</template>

<script>
import Navigation from './../Navigation';
import MovieInfo from './MovieInfo';
import MovieGrid from './MovieGrid';

export default {
  components: {
    vmdbNavigation: Navigation,
    vmdbMovieInfo: MovieInfo,
    vmdbMovieGrid: MovieGrid
  },
  methods: {
    scrollToTop () {
      window.scrollTo(0, 0);
    }
  },
  created () {
    this.scrollToTop();
    if (this.$route.params.id) {
      this.$store.dispatch('fetchMovie', { id: this.$route.params.id });
      this.$store.dispatch('fetchCredits', { id: this.$route.params.id });
    }
  }
};
</script>

<style lang="scss">
.vmdb-navigation {
  background: #353535;
  .breadcrumb {
    background: transparent;
    a {
      color: #ffffff;
    }
  }
}
</style>
