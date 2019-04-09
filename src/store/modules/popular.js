import { defaultResults } from './../data/results';
import { paths } from './../../api-paths';
import globalAxios from 'axios';
import Vue from 'vue';

const state = {
  popular: [],
  loading: false,
  pagination: {
    page: 0,
    total_pages: 0,
    is_search: false,
    query: '',
    prev_query: ''
  }
};

const getters = {
  popular: state => {
    return state.popular;
  },
  getPopularById: (state) => (id) => {
    return state.popular.find(popular => popular.id === id);
  },
  pagination: state => {
    return state.pagination;
  },
  loading: state => {
    return state.loading;
  }
};

const mutations = {
  setPopular: (state, payload) => {
    state.popular = payload;
  },
  setPagination: (state, payload) => {
    state.pagination = payload;
  },

  updateQuery (state, query) {
    Vue.set(state.pagination, 'query', query);
  },
  updateIsSearch (state, isSearch) {
    Vue.set(state.pagination, 'is_search', isSearch);
  }
};

const actions = {
  setPopular ({ commit }, payload) {
    commit('setPopular', payload);
  },
  initPopular ({ commit }, payload) {
    commit('setPopular', defaultResults.results);
  },
  fetchPopular ({ commit, state, dispatch }, payload) {
    commit('updateIsSearch', false);
    dispatch('listMovies', {});
  },
  nextPage ({ commit, state, dispatch }, payload) {
    dispatch('listMovies');
  },
  search ({ commit, state, dispatch }, payload) {
    if (state.pagination.prev_query === '' || state.pagination.query !== state.pagination.prev_query) {
      let pagination = state.pagination;
      pagination.page = 0;
      pagination.total_pages = 0;
      commit('setPagination', pagination);
    }

    commit('updateIsSearch', true);
    dispatch('listMovies', {});
  },
  listMovies ({ commit, state }, payload) {
    let path = paths.buildPath({ type: 'movies', pagination: state.pagination });
    state.loading = true;
    let vm = state;
    globalAxios.get(path)
      .then(res => {
        vm.loading = false;
        if (res.status === 200) {
          if (res.hasOwnProperty('data')) {
            if (res.data.hasOwnProperty('results')) {
              if (res.data.hasOwnProperty('page') && res.data.hasOwnProperty('total_pages')) {
                if (res.data.page > state.pagination.page) {
                  let results;
                  if (res.data.page === 1) {
                    results = res.data.results;
                  } else {
                    results = state.popular.concat(res.data.results);
                  }
                  commit('setPopular', results);
                  let pagination = state.pagination;
                  pagination.page = res.data.page;
                  pagination.total_pages = res.data.total_pages;
                  commit('setPagination', pagination);
                }
              }
            }
          }
        }
      })
      .catch(error => {
        vm.loading = false;
        // eslint-disable-next-line
        console.log(error);
      });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
