<template>
  <div class="vmdb-home-grid">
    <div class="container">
      <h1 class="my-4 text-left">Popular Movies</h1>
      <div class="row">
        <vmdb-home-grid-item v-for="result in popular" :movie="result" :key="result.id">
        </vmdb-home-grid-item>

        <div v-if="isLoading" class="col-12 d-flex justify-content-center">
          <div class="loader"></div>
        </div>
      </div>
      <div v-if="isLoadMore" class="vmdb-loadmorebtn">
        <button @click="loadMore" type="button" class="btn btn-success btn-lg btn-block my-5 text-white font-weight-light">Load More</button>
      </div>
    </div>
  </div>
</template>

<script>
import HomeGridItem from './HomeGridItem.vue';

export default {
  components: {
    vmdbHomeGridItem: HomeGridItem
  },
  data () {
    return {
      results: {}
    };
  },
  computed: {
    popular () {
      return this.$store.getters.popular;
    },
    isLoading () {
      return this.$store.getters.loading;
    },
    isLoadMore () {
      return this.$store.getters.pagination.page < this.$store.getters.pagination.total_pages;
    }
  },
  methods: {
    loadMore () {
      this.$store.dispatch('nextPage');
    }
  }
};
</script>

<style lang="scss">
  .vmdb-loadmorebtn .btn {
    font-size: 2.625em;
  }
  .loader {
    border: 0.5em solid #f3f3f3; /* Light grey */
    border-top: 0.5em solid #3498db; /* Blue */
    border-radius: 50%;
    width: 4em;
    height: 4em;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
