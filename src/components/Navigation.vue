<template>
  <div class="vmdb-navigation">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item" aria-current="page">
            <router-link tag="a" to="/">
            Home
            </router-link>
          </li>
          <li v-if="$route.params.id && movie" class="breadcrumb-item active" aria-current="page">{{ movie.title }}
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    movie () {
      return this.$store.getters.getMovieById(this.$route.params.id);
    }
  }
};

</script>

<style lang="scss">
  .breadcrumb {

    a {
      text-decoration: none;
    }

    .breadcrumb-item {
      font-size: 1.375em;

      &.active{
        color: #ffffff;
      }
    }
  }
  .breadcrumb-item + .breadcrumb-item::before {
    color: #ffffff;
  }
</style>
