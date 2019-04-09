import Home from './components/home/Home.vue';
import Movie from './components/movie/Movie.vue';

export const routes = [
  {
    name: 'home',
    path: '',
    component: Home
  },
  {
    name: 'movie',
    path: '/:id',
    component: Movie
  }
];
