<template>
  <div class="container-fluid px-0">
    <div class="vmdb-heroimage position-relative" :style="{background: background}">
      <div v-if="featured" class="vmdb-heroimage-content container">
        <div class="vmdb-heroimage-text text-left">
        <h1 class="text-white">{{ featured.title }}</h1>
        <p>{{ featured.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      styles: {
        background: 'blue'
      }
    };
  },
  computed: {
    background () {
      if (this.featured) {
        let img = this.imagePath(this.featured.backdrop_path, 'background');
        let style = 'linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%), url(' + img + '), rgb(28, 28, 28)';
        return style;
      }
      return '#353535';
    },
    featured () {
      return this.$store.getters.popular[0];
    }
  }
};
</script>

<style>
.vmdb-heroimage {
  height: 600px;
  /*linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%), url(http://image.tmdb.org/t/p/w1280/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg), rgb(28, 28, 28);*/

  /*background:
  -webkit-linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%), url(http://image.tmdb.org/t/p/w1280/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg), rgb(28, 28, 28);
  background:
  -o-linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%), url(http://image.tmdb.org/t/p/w1280/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg), rgb(28, 28, 28);
  background:
  linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%), url(http://image.tmdb.org/t/p/w1280/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg), rgb(28, 28, 28);*/
}
.vmdb-heroimage-text {
    z-index: 100;
    max-width: 700px;
    position: absolute;
    bottom: 40px;
    margin-right: 20px;
    min-height: 100px;
    background: transparent;
    color: #fff;
}
.vmdb-heroimage {
    background-size: 100%,cover!important;
    background-position: 50%,50%!important;
    width: 100%;
    height: 600px;
    position: relative;
}
</style>
