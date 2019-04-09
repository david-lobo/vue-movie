// vue.config.js
module.exports = {
  /* devServer: {
    public: 'http://localhost:8080'
  } */
};

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-movie/dist'
    : '/'
}
