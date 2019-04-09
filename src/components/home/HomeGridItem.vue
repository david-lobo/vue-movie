<template>
  <div class="col-md-3">
    <div class="vmdb-moviethumb mb-4">
      <router-link tag="a" :to="link">
        <img class="img-fluid" :src="movie ? imagePath(movie.poster_path, 'poster') : ''" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      link: {
        name: 'movie',
        params: {
          id: this.movie.id
        }
      }
    };
  },
  computed: {
    moviePosterPath () {
      return this.baseImageUri + '/' + this.posterPath + this.movie.poster_path;
    }
  },
  props: ['movie']
};
</script>
