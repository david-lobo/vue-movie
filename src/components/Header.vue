<template>
  <div class="vmdb-header">
    <div class="container">
      <nav class="navbar navbar-light">
        <a class="navbar-brand my-1" href="#">
          {{  appName }}
        </a>
        <img src="./../assets/tmdb_logo.png" class="rmdb-tmdb-logo my-1" alt="tmdb-logo">
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    appName () {
      return process.env.VUE_APP_NAME;
    }
  }
};
</script>

<style lang="scss" scoped>
  .vmdb-header {
    background-color: #1c1c1c;
    .navbar-brand {
      font-size: 1.5em;
      color: #fff;
      font-family: 'Teko', sans-serif;

      &:hover, &:focus {
        color: white;
      }
    }
  }
</style>
