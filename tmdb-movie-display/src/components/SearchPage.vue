<!-- HTML code to display best voted movies by default and then search by best voted -->
<template>
    <NavBar/>
    <div class="search-bar">
      <input type="text" placeholder="Search for movies" v-model="searchQuery" @input="searchMovies"/>
      <font-awesome-icon class="fa-icon" :icon="['fas', 'magnifying-glass']" @click="searchMovies"/>
    </div>
    <div class="movie-container">
        <div class="movie-list">
          <div v-for="movie in displayedMovies" :key="movie.id" class="movie-box">
            <router-link :to="`/details/${movie.id}`"><img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" /></router-link>
            <div class="movie-title">
              <a><router-link :to="`/details/${movie.id}`">{{ movie.title }}</router-link></a>
            </div>
          </div>
        </div>
      </div>
      <div class="load-more-button-container">
        <p v-if="hasMoreMovies" @click="loadMoreMovies" class="load-more-button">Load More</p>
      </div>
  </template>
    
  
  
  <script>
  import { getPopularMovies, searchMovies } from '@/services/tmdbService'; //importing functions from tmdbService
  import NavBar from './NavBar.vue'; //importing the NavBar component
  
    export default {
      name: 'SearchPage',
      components: {
        NavBar
      },
  
      data(){
        return{
          popularMovies: [],
          displayedMovies: [], 
          moviesPerPage: 12, 
          currentPage: 1, 
          hasMoreMovies: true,
          searchQuery: '', 
          isSearching: false, //Boolean to check if the user is searching
          searchPage: 1 //Page number for the search results
        }
      },
  
      async created(){
        try{
          // Fetching the first page of popular movies
          await this.loadMoreMovies();
        }
        catch(error){
          console.error('Error fetching data', error);
      }
      },
  
    methods: {
      // Function to load more movies. Calculates the next set of movies to be displayed and adds them to the displayedMovies array
      async loadMoreMovies() {
        try{
          //Checking if the user is searching for movies
          if(this.isSearching){
            const response = await searchMovies(this.searchQuery, this.searchPage)
            
            //Checking if there are more movies to display
            if(response.results.length > 0){
              this.displayedMovies = this.displayedMovies.concat(response.results);
              this.searchPage++;
            }
            else{
              this.hasMoreMovies = false;
            }
          }
          else{
            //Fetching the popular movies
            const movies = await getPopularMovies(this.currentPage);
          
          //Checking if there are more movies to display
          if (movies.length > 0){
            this.popularMovies = this.popularMovies.concat(movies); 
            this.displayedMovies = this.popularMovies.slice(0, this.currentPage * this.moviesPerPage);
            this.currentPage++; //Incrementing the current pagenumber
          }
          else{
            this.hasMoreMovies = false;
          }
          }
        }
        catch(error){
          console.error('Error fetching movies', error);
        }
      },
      //Function to search for movies
      async searchMovies(){
        //Checking if the search input is not empty
        if(this.searchQuery !== ''){
          try{
            this.isSearching = true;
            this.searchPage = 1;
            //Fetching the movies based on the search input
            const response = await searchMovies(this.searchQuery);
  
            //Checking if there are movies to display
            if(response.results && response.results.length > 0){
              const sortedResults = response.results.sort((a, b) => b.vote_count - a.vote_count); //sort the movies by best voted
              this.displayedMovies = sortedResults; //Setting the displayed movies
              this.hasMoreMovies = this.searchPage < response.total_pages; //Checking if there are more movies
            }
            else{
              //If there are no movies to display, set the displayed movies to an empty array
              this.displayedMovies = [];
              this.hasMoreMovies = false;
            }
          }
          catch(error){
            console.error('Error fetching movies', error);
          }
      }
      else{
        //If the search input is empty, display the popular movies
        this.isSearching = false;
        this.displayedMovies = this.popularMovies.slice(0, this.currentPage * this.moviesPerPage);
        this.hasMoreMovies = true;
      }
     }
    }
  };
  </script>
    
  
  
  <style scoped>
    /*Styling of the search bar*/
    .search-bar{
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: calc(var(--navbar-height) + 30px);
      padding-bottom: 30px;
      gap: 20px;
    }
  
  
    .search-bar input{
      width: 50%;
      padding: 15px;
      font-size: 20px;
      border-radius: 30px;
      border: none;
    }
  
    .fa-icon{
      font-size: 25px;
      color: white;
      cursor: pointer;
      transition: color 0.5s ease;
    }
  
    .fa-icon:hover{
      color: rgb(108, 73, 235);
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
  
      .search-bar{
        width: 850px;
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