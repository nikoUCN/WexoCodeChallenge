<template>
    <div class="movie-details-container" v-if="movie && movie.poster_path">
      <NavBar />
        <div class="movie-image">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie poster" />
        </div>
        <div class="movie-details">
          <div class="movie-title">
            <h1>{{ movie.original_title }}</h1>
          </div>
          <div class="movie-overview">
            <p>{{ movie.overview }}</p>
          </div>
          <div class="movie-genres">
            <p>Genres: {{ movieGenres }}</p>
          </div>
          <div class="movie-release-date">
            <p>Release date: {{ movie.release_date }}</p>
          </div>
          <div class="movie-actors">
            <p>Actors: {{ movieActors }}</p>
          </div>
          <div class="movie-rating">
            <p>Vote average: {{ movie.vote_average }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getMovieDetails } from '@/services/tmdbService';
  import NavBar from './NavBar.vue';

  export default {
    name: 'DetailsPage',
    components: {
      NavBar
    },  
    data(){
      return{
        movie: null, // Object to store the movie 
        movieGenres: '',
        movieActors: '' // String to store the movie actors
      };
    },
    async created(){
      const movieId = this.$route.params.id; // Getting the movie id from the route
      try{
        // Fetching the movie details
        const movie = await getMovieDetails(movieId); 
        this.movie = movie; 
        this.movieGenres = movie.genres.map(genre => genre.name).join(', ');
        this.movieActors = movie.credits.cast.slice(0, 3).map(actor => actor.name).join(', '); // Joining the actors
      }
      catch(error){
        console.error('Error fetching data', error);
      }
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('saveScrollPosition', window.scrollY);
      next();
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        const scrollPosition = vm.$store.state.scrollPosition;
        if(scrollPosition !== null){
          window.scrollTo(0, scrollPosition);
        }
      });
    }
  }
  </script>
  
  <style>
  /*Styling of the movie details container*/
  .movie-details-container{
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: calc(var(--navbar-height) + 20px);
  }

  /*Styling of the movie image*/
  .movie-image{
      width: 25%;
  }

  .movie-image img{
      width: 100%;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  }

  /*Styling of the movie details*/
  .movie-details{
      width: 50%;
      padding-left: 30px;
  }

  /*Styling of the movie title*/
  .movie-title{
      display: flex;
      justify-content: flex-start;
      text-align: left;
  }

  .movie-title h1{
      font-size: 50px;
      color: rgb(108, 73, 235);
  }

  /*Styling of the movie overview*/
  .movie-overview{
    display: flex;
    justify-content: flex-start;
    text-align: justify;
    padding-top: 20px;
  }

  .movie-overview p{
      font-size: 15px;
      color: white;
  }

  /*Styling of the movie genres*/
  .movie-genres{
      display: flex;
      justify-content: flex-start;
      padding-top: 20px;
  }

  .movie-genres p{
      font-size: 13px;
      color: rgba(255, 255, 255, 0.4);
  }

  /*Styling of the movie release date*/
  .movie-release-date{
      display: flex;
      justify-content: flex-start;
      padding-top: 20px;
  }

  .movie-release-date p{
      font-size: 13px;
      color: rgba(255, 255, 255, 0.4);
  }

  /*Styling of the movie actors*/
  .movie-actors{
      display: flex;
      justify-content: flex-start;
      padding-top: 20px;
  }

  .movie-actors p{
      font-size: 13px;
      color: rgba(255, 255, 255, 0.4);
  }

  /*Styling of the movie rating*/
  .movie-rating{
      display: flex;
      justify-content: flex-start;
      padding-top: 20px;
  }

  .movie-rating p{
      font-size: 13px;
      color: rgba(255, 255, 255, 0.4);
  }

  </style>
