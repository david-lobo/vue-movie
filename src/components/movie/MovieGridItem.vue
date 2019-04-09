<template>
  <div class="col-md-3">
    <div class="vmdb-actor mb-4">
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img :src="actor ? imagePath(actor.profile_path, 'thumb') : ''" class="card-img" alt="User Profile">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title vmdb-actor-name">{{ actor.name}}</h5>
              <p class="card-text vmdb-actor-character">{{ actor.character }}</p>
            </div>
          </div>
        </div>
      </div>
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
          id: 123
        }
      }
    };
  },
  props: ['actor']
};
</script>

<style>
  .card {
    border: 0;
    background: #353535;
    color: #ffffff;
    text-align: left;
  }
</style>
