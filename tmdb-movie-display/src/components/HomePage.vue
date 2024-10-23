<template>
  <div :style="{backgroundImage: `url(${backgroundImageUrl})`}" class="header-image"></div> <!-- Setting the background image URL -->
    <div class="header-container">
        <div class="header-text">
            <h1><span>WEXO</span> Movies</h1>
            <p>Find your favorite movies here!</p>
        </div>
    </div>
    <div class="popular-header-container">
        <h2>Popular Movies</h2>
    </div>
    <div class="movie-container">
      <div class="movie-list">
        <div v-for="movie in displayedMovies" :key="movie.id" class="movie-box">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" />
          <div class="movie-title">
            {{ movie.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="load-more-button-container">
      <p v-if="displayedMovies.length < popularMovies.length" @click="loadMoreMovies" class="load-more-button">Load More</p>
    </div>
  </template>
  



<script>
//importing functions from tmdbService
import { getHomePicture, getPopularMovies } from '@/services/tmdbService'; 

// Exporting the HomePage component
export default {
  name: 'HomePage',
  // Data property to store the background image URL
  data(){
    return{
       backgroundImageUrl: '',
       popularMovies: [],
       displayedMovies: [], // Array to store the displayed movies
       moviesPerPage: 9 //Number of movies to be displayed per page
    };
  },
  // Fetched the home picture by awaiting the getHomePicture function
   async created(){
    try{
      // Fetching the home picture
      const imagePath = await getHomePicture();
      this.backgroundImageUrl = `https://image.tmdb.org/t/p/original${imagePath}`; // Setting the background image URL
     
      // Fetching the popular movies
      const popularMovies = await getPopularMovies(); 
      this.popularMovies = popularMovies; 
      this.displayedMovies = popularMovies.slice(0, this.moviesPerPage); // Displaying the first 9 movies
    }
     catch(error){
       console.error('Error fetching data', error);
    }
  },
  methods: {
    // Function to load more movies. Calculates the next set of movies to be displayed and adds them to the displayedMovies array
    loadMoreMovies() {
      const currentLength = this.displayedMovies.length;
      const nextMovies = this.popularMovies.slice(currentLength, currentLength + this.moviesPerPage); 
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

/*Styling of the header image*/
.header-image{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/*Styling of the header container*/
.header-container{
  display: flex;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  margin-bottom: 30px;
}


  /*Styling of header text*/
  .header-text{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    z-index: 50;
  }

  .header-text h1{
      font-size: 80px;
      font-weight: bold;
      color: white;
      margin: 0 30px;
  }

  .header-text span{
    font-size: 150px;
    color: rgb(108, 73, 235);
  }

  .header-text p{
      font-size: 25px;
      font-weight: bold;
      color: white;
      margin: 5px 40px;
  }

  /*Styling of the popular movies header*/
  .popular-header-container{
    display: flex;
    justify-content: flex-start;
    padding: 10px 30px;
  }

  .popular-header-container h2{
    font-size: 40px;
    font-weight: bold;
    color: white;
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