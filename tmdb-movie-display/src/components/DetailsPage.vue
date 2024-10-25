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
          <div class="favorite-icon">
            <div @click="toggleFavorite" @mouseover="isHovered = true" @mouseleave="isHovered = false">
              <font-awesome-icon class= "fa-icon" :class="{active: isFavorite}" :icon="isHovered || isFavorite ? ['fas', 'bookmark'] : ['far', 'bookmark']" />
            </div>
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
        movieActors: '', // String to store the movie actors
        isHovered: false,
        isFavorite: false
      };
    },
    async created(){
      try{
        // Fetching the movie details
        const movieId = this.$route.params.id; // Getting the movie id from the route
        const movie = await getMovieDetails(movieId); 
        this.movie = movie; 
        this.movieGenres = movie.genres.map(genre => genre.name).join(', ');
        this.movieActors = movie.credits.cast.slice(0, 3).map(actor => actor.name).join(', '); // Joining the actors
        this.isFavorite = this.checkIfFavorite(movie.id);
        console.log(`Movie ID: ${movie.id}, isFavorite: ${this.isFavorite}`);
      }
      catch(error){
        console.error('Error fetching data', error);
      }
    },
    methods: {
      // Method to toggle favorite status
      toggleFavorite(){
        const movieId = this.movie.id;
        const movie = {
          id: movieId,
          title: this.movie.original_title,
          poster_path: this.movie.poster_path
        };

        let favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];

        // If the movie is a favorite, remove it from the favorites
        if(this.isFavorite){
          favorites = favorites.filter(fav => fav.id !== movieId);
        }
        else{
          if(!favorites.some(fav => fav.id === movieId)){
            favorites.push(movie);
          }
        }

        // Storing the favorite movies in the session storage
        sessionStorage.setItem('favorites', JSON.stringify(favorites));
        this.isFavorite = this.checkIfFavorite(movieId);
        console.log(`Toggled isFavorite to: ${this.isFavorite}`);
      },
      // Method to check if the movie is a favorite
      checkIfFavorite(movieId){
        const favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
        return favorites.some(fav => fav.id === movieId);
      }
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

  /*Styling of the favorite icon*/
  .favorite-icon{
      display: flex;
      justify-content: flex-start;
      padding-top: 20px;
  }

  .favorite-icon .fa-icon{
      font-size: 20px;
      color: white;
      cursor: pointer;
      transition: color 0.5s ease;
  }

  .favorite-icon .fa-icon:hover{
      color: rgb(108, 73, 235);
  }

  .favorite-icon .fa-icon.active{
      color: rgb(108, 73, 235);
  }


  </style>
