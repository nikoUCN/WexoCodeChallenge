<template>
  <div>
    <NavBar />
    <div class="genre-container">
      <div class="genre-list">
        <div v-for="genre in filteredGenres" :key="genre.id" class="genre-box"> <!-- Looping through the genre array by id-->
          {{ genre.name }} <!-- displaying the genre name -->
        </div>
      </div>
    </div>
    <div class="movie-container">
      <div class="movie-list">
        <div v-for="movie in displayedMovies" :key="movie.id" class="movie-box">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" /> <!-- Displaying the movie poster -->
          <div class="movie-title">
            {{ movie.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="load-more-button-container">
      <p v-if="displayedMovies.length < movies.length" @click="loadMoreMovies" class="load-more-button">Load More</p>
  </div>
  </template>
  
  <script>
  //importing functions from tmdbService
  import { getGenres, getMoviesAlpabetically } from '@/services/tmdbService'; 
  import NavBar from './NavBar.vue';

  export default {
    name: 'MoviePage',
    components: {
      NavBar
    },
    data(){
      return{
        genres: [],
        filteredGenres: [],
        movies: [],
        displayedMovies: [], 
        moviesPerPage: 9
      };
    },
    async created(){
      try{
        // Fetching the genres
        const genres = await getGenres(); 
        this.genres = genres; // Setting the genres
        const indexes = [0, 1, 2, 3, 5, 6, 7, 8, 10, 13, 14, 16]; // Indexes of the genres to be displayed
        this.filteredGenres = indexes.map(index => genres[index]); // Filtering the genres to be displayed
      }
      catch(error){
        console.error('Error fetching data', error);
      }

      try{
        // Fetching the movies
        const movies = await getMoviesAlpabetically(); 
        this.movies = movies; // Setting the movies
        this.displayedMovies = movies.slice(0, this.moviesPerPage);
      }
      catch(error){
        console.error('Error fetching data', error);
      }
    },
  methods: {
    // Function to load more movies. Calculates the next set of movies to be displayed and adds them to the displayedMovies array
    loadMoreMovies() {
      const currentLength = this.displayedMovies.length;
      const nextMovies = this.movies.slice(currentLength, currentLength + this.moviesPerPage); 
      this.displayedMovies = this.displayedMovies.concat(nextMovies); 
    },
    // Function to load the movies before displaying them
    addLoadedClass() {
      const movieBoxes = this.$el.querySelectorAll('.movie-box');
      movieBoxes.array.forEach((box, index) => {
        setTimeout(() => {
          box.classList.add('loaded');
        }, index * 100);
      });
    }
  }
};
  </script>
  
  <style scoped>
  /*Styling of the genre list*/
  .genre-container{
    display: flex;
    justify-content: center;
    padding-top: calc(var(--navbar-height) + 20px);
  }

  .genre-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 40px;
  }

  .genre-box{
      padding: 10px 20px;
      color: white;
      font-size: 15px;
      font-weight: bold;
      border-radius: 30px;
      border-color: rgb(108, 73, 235);
      border-style: solid;
      cursor: pointer;
      transition: background-color 0.5s ease;
  }

  .genre-box:hover{
      background-color: rgb(108, 73, 235);
  }

  /*Styling of the movie poster*/
  .movie-container{
    display: flex;
    justify-content: center;
  }

  .movie-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 20px;
      gap: 20px;
  }

  .movie-box{
    width: calc(33.33% - 20px);
    transform: translateY(20px);
    transition: transform 0.5s ease;
  }

  .movie-box.loaded{
    transform: translateY(0);
  }

  .movie-box img{
    width: 100%;
    height: 90vh;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  /*Styling of the movie title*/
  .movie-title{
      display: flex;
      justify-content: flex-start;
      font-size: 20px;
      font-weight: bold;
      color: white;
      margin: 10px 0;
      cursor: pointer;
  }

   /*Styling of the load more button*/
   .load-more-button-container{
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  .load-more-button{
    font-size: 15px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 30px;
    border-style: solid;
    border-color: rgb(108, 73, 235);
    transition: transform 0.5s, background-color 0.5s ease;
  }

  .load-more-button:hover{
    background-color: rgb(108, 73, 235);
    transform: scale(1.1);
  }
  </style>