<template>
  <div class="vmb-searchbar py-3">
    <div class="container">
      <nav class="navbar navbar-expand-lg px-0">
        <form class="form-inline w-100" autocomplete="off">
          <div class="input-group w-100">
            <font-awesome-icon icon="search" />
            <input v-model="query" @input="search($event)" id="query" type="text" class="form-control custom-input" name="search" value="" placeholder="Search" required autofocus style="border-radius: 30px;" autocomplete="off">
          </div>
        </form>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    search (event) {
      if (event.target.value.length >= 2) {
        this.$store.dispatch('search');
      }
    }
  },
  computed: {
    query: {
      get () {
        return this.$store.state.query;
      },
      set (value) {
        this.$store.commit('updateQuery', value);
      }
    }
  }
};
</script>

<style lang="scss">
.vmb-searchbar {
  background: #1c1c1c;
  .input-group {
    background: #1c1c1c;
    input.form-control {
      background: #353535 !important;
      border-color: #1c1c1c;
      color: #ffffff;
      font-size: 2em;
    }
  }
}
.input-group {
  background: #353535;
}
form i.fa, .fa-search {
  position: absolute;
  top: 16px;
  left: 20px;
  color: #ffffff;
  font-size: 2em;
  z-index: 9999;
}
.form-control {
  position: relative;
  padding-left: 4.5rem !important;

}
</style>
