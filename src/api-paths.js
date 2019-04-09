
export const paths = {
  api_key: process.env.VUE_APP_API_KEY,
  baseUri: process.env.VUE_APP_API_ENV === 'production' ? process.env.VUE_APP_API_BASE_URI : process.env.VUE_APP_TEST_API_BASE_URI,
  development: {
    popular (pagination) { return `?endpoint=popular&page=${pagination.page + 1}`; },
    search (pagination) { return `?endpoint=search&page=${pagination.page + 1}&query=${pagination.query}`; },
    movie (id) { return `?endpoint=movie-${id}`; },
    credits (id) { return `?endpoint=credits-${id}`; }
  },
  production: {
    popular (pagination) { return `movie/popular?api_key=${paths.api_key}&language=en-US&page=${(pagination.page + 1)}`; },
    search (pagination) { return `search/movie?api_key=${paths.api_key}&language=en-US&page=${(pagination.page + 1)}&query=${pagination.query}`; },
    movie (id) { return `movie/${id}?api_key=${paths.api_key}&language=en-US`; },
    credits (id) { return `movie/${id}/credits?api_key=${paths.api_key}&language=en-US`; }
  },
  popular: {
    endpoint () { return paths.test_mode ? '?endpoint=popular' : 'movie/popular'; }
  },
  search: {
    endpoint () { return paths.test_mode ? '?endpoint=search' : 'search/movie'; }
  },
  buildPath (config) {
    let env = process.env.VUE_APP_API_ENV === 'production' ? 'production' : 'development';
    if (config.type === 'movies') {
      let pagination = config.pagination;
      if (!pagination.is_search) {
        return paths[env].popular(pagination);
      } else {
        return paths[env].search(pagination);
      }
    } else if (config.type === 'movie') {
      return paths[env].movie(config.id);
    } else if (config.type === 'credits') {
      return paths[env].credits(config.id);
    }
  }
};

// Sample API Paths
// https://api.themoviedb.org/3/movie/920?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US
// https://api.themoviedb.org/3/movie/920/credits?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US
// https://api.themoviedb.org/3/movie/popular?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US&page=1
// https://api.themoviedb.org/3/search/movie?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US&query=fucksodosd
