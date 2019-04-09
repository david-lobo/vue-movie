import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import { paths } from './api-paths';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faMoneyBillAlt, faTicketAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './assets/styles/custom-bootstrap.scss';
import { routes } from './routes';
import { store } from './store/store';

Vue.use(VueRouter);

axios.defaults.baseURL = paths.baseUri;
// axios.defaults.baseURL = 'http://topstuffreview.com/movies/index.php';
// axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

library.add(faSearch);
library.add(faClock);
library.add(faMoneyBillAlt);
library.add(faTicketAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);

let baseImageUri = 'http://image.tmdb.org/';
let thumbNoImage = require('./assets/no_image.jpg');

Vue.mixin({
  methods: {
    imagePath: (filename, size) => {
      let posterSize;
      if (!filename || filename === 'null') {
        return thumbNoImage;
      }
      if (size === 'poster') {
        posterSize = 't/p/w500/';
      } else if (size === 'thumb') {
        posterSize = 't/p/w154/';
      } else if (size === 'background') {
        posterSize = 't/p/w1280/';
      }
      return baseImageUri + '/' + posterSize + filename;
    }
  }
});

Vue.config.productionTip = false;

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/vue-movie/dist' : '/'
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
