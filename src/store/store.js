import Vue from 'vue';
import Vuex from 'vuex';
import popular from './modules/popular';
import movies from './modules/movies';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    popular,
    movies
  }
});
