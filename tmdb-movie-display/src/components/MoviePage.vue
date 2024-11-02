<!-- HTML code to display genres and a list of best voted movies -->
<template>
  <div>
    <NavBar />
    <div class="genre-container">
      <div class="genre-list">
        <div v-for="genre in filteredGenres" 
        :key="genre.id" 
        :class="['genre-box', {active: genre.id === selectedGenre}]"  
        @click="selectGenre(genre.id)"> 
          {{ genre.name }} <!-- displaying the genre name -->
        </div>
      </div>
    </div>
    <div class="movie-count" v-if="selectedGenre">
        <p>{{ totalMovies }} movies in {{ selectedGenreName }}</p>
      </div>
    <div class="movie-container">
      <div class="movie-list">
        <div v-for="movie in displayedMovies" :key="movie.id" class="movie-box">
          <router-link :to="`/details/${movie.id}`"><img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" /></router-link> <!-- Displaying the movie poster -->
          <div class="movie-title">
            <a><router-link :to="`/details/${movie.id}`">{{ movie.title }}</router-link></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="load-more-button-container">
      <p v-if="hasMoreMovies" @click="loadMoreMovies" class="load-more-button">Load More</p>
  </div>
  </template>
  


  <script>
  //importing functions from tmdbService
  import { getGenres, getBestVotedMovies, getMoviesByGenre } from '@/services/tmdbService'; 
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
        moviesPerPage: 12,
        currentPage: 1,
        hasMoreMovies: true,
        selectedGenre: null, //Storing the selected genres
        selectedGenreName: '', //Storing the selected genre name
        totalMovies: 0
      };
    },

    async created(){
      try{
        // Fetching the genres
        const genres = await getGenres(); 
        this.genres = genres; // Setting the genres
        const indexes = [0, 2, 3, 4, 5, 6, 10, 13, 16, 17]; // Indexes of the genres to be displayed
        this.filteredGenres = indexes.map(index => genres[index]); // Filtering the genres to be displayed
      }
      catch(error){
        console.error('Error fetching genres', error);
      }

      try{
        //Fetching the first page of best voted movies
        await this.loadMoreMovies();
      }
      catch(error){
        console.error('Error fetching more movies', error);
      }
    },

  methods: {
    // Function to load more movies. Calculates the next set of movies to be displayed and adds them to the displayedMovies array
    async loadMoreMovies() {
      try{
        // Fetching the movies based on the selected genre
        let movies;
        if(this.selectedGenre){
          const response = await getMoviesByGenre(this.selectedGenre, this.currentPage);
          movies = response.results;
          this.totalMovies = response.totalResults;
          console.log('total results:', response.totalResults);
        }

        // Fetching the best voted movies if no genre is selected
        else{
          movies = await getBestVotedMovies(this.currentPage);
        }

        // Adding the fetched movies to the movies array
        if(movies.length > 0){
          this.movies = this.movies.concat(movies);
          this.displayedMovies = this.movies.slice(0, this.currentPage * this.moviesPerPage);
          this.currentPage++; //Incrementing the current pagenumber
        }
        else{
          this.hasMoreMovies = false;
        }
      }
      catch(error){
        console.error('Error fetching movies', error);
      }
        
    },

    // Function to select the genre
    async selectGenre(genreId) {
      this.selectedGenre = genreId;
      this.selectedGenreName = this.genres.find(genre => genre.id === genreId).name;
      // Resetting the movies array, current page number, displayed movies array and hasMoreMovies boolean
      this.currentPage = 1; 
      this.movies = []; 
      this.displayedMovies = []; 
      this.hasMoreMovies = true 
      await this.loadMoreMovies();
    }
  }
};
  </script>
  


  <style scoped>
  /*Styling of the genre list*/
  .genre-container{
    display: flex;
    justify-content: center;
    padding-top: calc(var(--navbar-height) + 40px);
    padding-bottom: 40px;
  }

  .genre-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 20px;
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

  .genre-box.active{
    background-color: rgb(108, 73, 235);
  }

  /*Styling of the movie count*/
  .movie-count{
    display: flex;
    justify-content: flex-start;
    padding: 0 20px;
  }

  .movie-count p{
    font-size: 13px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
  }

  /*Styling of the movie poster*/
  .movie-container{
    display: flex;
    justify-content: flex-start;
  }

  .movie-list{
    display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 20px;
      gap: 20px;
      width: 100%;
  }

  .movie-box{
    transition: transform 0.5s ease;
  }

  .movie-box:hover{
    transform: scale(1.02);
  }

  .movie-box img{
    width: 100%;
    height: auto;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
    cursor: pointer;
    height: 90%;
  }

  /*Styling of the movie title*/
  .movie-title a{
      display: flex;
      justify-content: flex-start;
      font-size: 20px;
      font-weight: bold;
      color: white;
      text-decoration: none;
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

  /*Styling for mobile devices*/
  @media only screen and (max-width: 850px){

  .genre-container{
    width: 850px;
    padding: 10px;
    padding-top: calc(var(--navbar-height) + 40px);
    padding-bottom: 40px;
  }

  .movie-container{
    display: flex;
    justify-content: center;
    width: 850px;
  }

  .movie-list{
    grid-template-columns: repeat(3, 1fr);
  }

  .load-more-button-container{
    display: flex;
    justify-content: center;
    width: 850px
  }
  }
  </style>