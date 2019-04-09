import { movie424783 } from './../data/movie_424783';
import { credits424783 } from './../data/credits_424783';
import globalAxios from 'axios';
import Vue from 'vue';
import { paths } from './../../api-paths';

let localStorageAvailable = () => {
  let test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

let getMovieLocal = (movieId) => {
  if (!localStorageAvailable()) {
    return false;
  }

  let previous = localStorage.getItem(movieId);

  if (previous) {
    return JSON.parse(previous);
  }

  return false;
};

let setMovieLocal = (movieId, dataType, data) => {
  if (!localStorageAvailable()) {
    return false;
  }

  let previous = localStorage.getItem(movieId);
  let movie = {};

  if (previous) {
    movie = JSON.parse(previous);
  }

  movie[dataType] = data;

  localStorage.setItem(movieId, JSON.stringify(movie));
};

const state = {
  movies: {},
  actors: {},
  directors: {}
};

const getters = {
  movies: state => {
    return state.movies;
  },
  actors: state => {
    return state.actors;
  },
  directors: state => {
    return state.directors;
  },
  getMovieById: (state) => (id) => {
    if (!state.movies.hasOwnProperty(id)) {
      return null;
    }
    return state.movies[id];
  },
  getDirectorsById: (state) => (id) => {
    if (!state.directors.hasOwnProperty(id)) {
      return null;
    }
    return state.directors[id];
  },
  getActorsById: (state) => (id) => {
    if (!state.actors.hasOwnProperty(id)) {
      return null;
    }
    return state.actors[id];
  }
};

const mutations = {
  setMovies: (state, payload) => {
    state.movies = payload;
  },
  setMovie: (state, payload) => {
    if (payload.hasOwnProperty('id')) {
      if (payload.hasOwnProperty('data')) {
        let data = payload.data;
        Vue.set(state.movies, payload.id, data);
      }
    }
  },
  setActors: (state, payload) => {
    if (payload.hasOwnProperty('id')) {
      if (payload.hasOwnProperty('data')) {
        let data = payload.data;
        Vue.set(state.actors, payload.id, data);
      }
    }
  },
  setDirectors: (state, payload) => {
    if (payload.hasOwnProperty('id')) {
      if (payload.hasOwnProperty('data')) {
        let data = payload.data;
        Vue.set(state.directors, payload.id, data);
      }
    }
  }
};

const actions = {
  setMovies ({ commit }, payload) {
    commit('setMovies', payload);
  },
  initMovies ({ commit }, payload) {
    let directors = credits424783.crew.filter(credit => credit.job === 'Director');
    let actors = credits424783.cast;
    let movie = movie424783;
    let movieId = movie.id;

    commit('setMovie', { id: movieId, data: movie });
    commit('setActors', { id: movieId, data: actors });
    commit('setDirectors', { id: movieId, data: directors });
  },
  fetchMovie ({ commit, state }, payload) {
    if (!payload || !payload.hasOwnProperty('id')) {
      return;
    }

    let movie = getMovieLocal(payload.id);
    if (movie) {
      if (movie.hasOwnProperty('movie')) {
        movie = movie.movie;
        commit('setMovie', { id: payload.id, data: movie });
        return;
      }
    }

    let path = paths.buildPath({ type: 'movie', id: payload.id });

    globalAxios.get(path)
      .then(res => {
        if (res.status === 200) {
          if (res.hasOwnProperty('data')) {
            if (res.data.hasOwnProperty('id')) {
              setMovieLocal(res.data.id, 'movie', res.data);
              commit('setMovie', { id: res.data.id, data: res.data });
            }
          }
        }
      })
      // eslint-disable-next-line
      .catch(error => console.log(error));
  },
  fetchCredits ({ commit, state }, payload) {
    if (!payload || !payload.hasOwnProperty('id')) {
      return;
    }

    let movie; let actors; let directors; let actorsLoaded = false; let directorsLoaded = false;

    movie = getMovieLocal(payload.id);
    if (movie) {
      if (movie.hasOwnProperty('actors')) {
        actors = movie.actors;
        commit('setActors', { id: payload.id, data: actors });
        actorsLoaded = true;
      }

      if (movie.hasOwnProperty('directors')) {
        directors = movie.directors;
        commit('setDirectors', { id: payload.id, data: directors });
        directorsLoaded = true;
      }

      if (actorsLoaded && directorsLoaded) {
        return;
      }
    }

    let path = paths.buildPath({ type: 'credits', id: payload.id });
    globalAxios.get(path)
      .then(res => {
        if (res.status === 200) {
          if (res.hasOwnProperty('data')) {
            if (res.data.hasOwnProperty('id')) {
              let updated = false;

              if (res.data.hasOwnProperty('crew')) {
                updated = true;
                directors = res.data.crew.filter(credit => credit.job === 'Director');
              }

              if (res.data.hasOwnProperty('cast')) {
                updated = true;
                actors = res.data.cast;
              }

              if (updated) {
                setMovieLocal(res.data.id, 'actors', actors);
                setMovieLocal(res.data.id, 'directors', directors);

                commit('setActors', { id: res.data.id, data: actors });
                commit('setDirectors', { id: res.data.id, data: directors });
              }
            }
          }
        }
      })
      // eslint-disable-next-line
      .catch(error => {console.log(error)});
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
