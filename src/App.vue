<template>
  <div id="app">
    <vmdb-header></vmdb-header>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    'vmdbHeader': Header
  }
};
</script>

<style lang="scss">
  #app {
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    h1 {
      font-weight: 400;
    }

    h3, h4, h5 {
      font-weight: 700;
    }
  }

  .fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>
