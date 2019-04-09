<template>
  <div class="container-fluid px-0">
    <div class="vmdb-movieinfo position-relative pt-5">
      <div class="vmdb-movieinfo-content container">
        <div class="row mb-2">
          <div class="col-12">
            <div v-if="movie" class="rmdb-movieinfo-content card mb-3" style="max-width: 100%;">
              <div class="row no-gutters">
                <div class="rmdb-movieinfo-thumb col-md-4">
                  <img :src="movie ? imagePath(movie.poster_path, 'poster') : ''" class="img-fluid card-img" alt="...">
                </div>
                <div v-if="movie" class="rmdb-movieinfo-text col-md-8 p-4">
                  <div class="card-body">
                    <div class="text-left">
                      <h1 class="movie_title">{{ movie.title }}<span>&nbsp;({{ movie.status }})</span></h1>
                      <h3 class="h6">PLOT</h3>
                      <p>{{ movie.overview }}</p>
                      <div class="rmdb-flexcontainer">
                        <div class="rmdb-genres">
                          <h4 class="h6">GENRES</h4>
                          <div class="rmdb-flexcontainer">
                            <ul>
                              <li v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <h3 class="h6">IMDB RATING</h3>
                      <div class="rmdb-rating d-flex">
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" :style="{width: movie.vote_average * 10 + '%'}" :aria-valuenow="movie.vote_average * 10" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                        <p class="rmdb-score ml-3 mb-0">{{ movie.vote_average }}</p>
                      </div>
                      <h3 class="h6">DIRECTOR</h3>
                      <p v-for="director in directors" class="rmdb-director" :key="director.id">{{ director.name }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vmdb-movie-info-bar :movie="movie"></vmdb-movie-info-bar>
  </div>
</template>

<script>
import MovieInfoBar from './MovieInfoBar';

export default {
  computed: {
    movie () {
      return this.$store.getters.getMovieById(this.$route.params.id);
    },
    directors () {
      return this.$store.getters.getDirectorsById(this.$route.params.id);
    }
  },
  components: {
    vmdbMovieInfoBar: MovieInfoBar
  }
};
</script>

<style lang="scss">
.vmdb-movieinfo-thumb {
  width: 350px;
}
.vmdb-movieinfo {
  height: 600px;
  background: linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%), url(http://image.tmdb.org/t/p/w1280/h3KN24PrOheHVYs9ypuOIdFBEpX.jpg), rgb(28, 28, 28);
}
.rmdb-movieinfo-content {
    margin: 0 auto;
    background: rgba(0,0,0,.7);
    position: relative;
}
.rmdb-movieinfo-text {
    width: auto;
    color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.rmdb-movieinfo-text > p {
  margin: 1em 0;
}
.rmdb-movieinfo-text h1 {
    font-size: 3rem;
    margin: 0;
}
.rmdb-movieinfo-text h3 {
    line-height: 0;
    margin-top: 2rem;
}
.rmdb-movieinfo-text h4 {
}
.rmdb-flexcontainer ul {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      margin-right: 1.2rem;
    }
}
.rmdb-rating {
  margin-top: 1.25rem;
}
.progress {
  width: 250px;
  height: 1.375rem;
}
.vmdb-movieinfo {
    background-size: 100%,cover!important;
    background-position: 50%,50%!important;
    width: 100%;
    height: 600px;
    position: relative;
}
.rmdb-movieinfobar {
    width: 100%;
    height: 105px;
    background: #1c1c1c;
    position: relative;
    padding: 25px 20px 0;
    font-size: 1.375rem;
}
.rmdb-movieinfobar-content {
    width: 100%;
    color: #fff;

    .rmdb-movieinfobar-content-col {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .rmdb-movieinfobar-info {
        padding-left: 0.6rem;
      }
    }
}
</style>
