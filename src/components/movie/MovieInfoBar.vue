<template>
  <div class="rmdb-movieinfobar">
    <div class="vmdb-movieinfo-content container">
      <div v-if="movie" class="rmdb-movieinfobar-content row">
        <div class="rmdb-movieinfobar-content-col col-4">
          <font-awesome-icon icon="clock" class="fa-2x" />
          <span class="rmdb-movieinfobar-info">Running Time: {{ movie.runtime  | duration }}</span>
        </div>
        <div class="rmdb-movieinfobar-content-col col-4">
          <font-awesome-icon icon="money-bill-alt" class="fa-2x" />
          <span class="rmdb-movieinfobar-info">Budget: {{ movie.budget | money }}</span>
        </div>
        <div class="rmdb-movieinfobar-content-col col-4">
          <font-awesome-icon icon="ticket-alt" class="fa-2x" />
          <span class="rmdb-movieinfobar-info">Revenue: {{ movie.revenue | money }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie'],
  filters: {
    duration: function (value) {
      if (!value) {
        return;
      }
      let num = value;
      let hours = (num / 60);
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);

      return rhours + 'h ' + rminutes + 'm';
    },
    money: function (value) {
      if (!value) {
        return;
      }
      let money = Number(value.toFixed(0)).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0 });

      return money;
    }
  }
};
</script>
