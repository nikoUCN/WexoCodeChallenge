<!-- HTML code to display a background image and the popular movies -->
<template>
  <NavBar />
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
//importing functions from tmdbService
import { getHomePicture, getPopularMovies } from '@/services/tmdbService'; 
import NavBar from './NavBar.vue';

export default {
  name: 'HomePage',
  components: {
      NavBar
    },

  data(){
    return{
       backgroundImageUrl: '',
       popularMovies: [],
       displayedMovies: [], // Array to store the displayed movies
       moviesPerPage: 12, //Number of movies to be displayed per page
       currentPage: 1, //Current page number
       hasMoreMovies: true //Boolean to check if there are more movies
    };
  },

   async created(){
    try{
      // Fetching the home picture
      const imagePath = await getHomePicture();
      this.backgroundImageUrl = `https://image.tmdb.org/t/p/original${imagePath}`; // Setting the background image URL
     
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
        const movies = await getPopularMovies(this.currentPage);
        if(movies.length > 0){
          this.popularMovies = this.popularMovies.concat(movies); 
          this.displayedMovies = this.popularMovies.slice(0, this.currentPage * this.moviesPerPage);
          this.currentPage++; //Incrementing the current pagenumber
        }
        else{
          this.hasMoreMovies = false;
        }
      }
      catch(error){
        console.error('Error fetching movies', error);
      }
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

    .header-image {
    width: 850px;
    overflow-x: hidden;
    }

    .header-text span{
      font-size: 50px;
    }

    .header-text h1{
      font-size: 35px;
    }

    .header-text p{
      font-size: 15px;
    }

    .popular-header-container h2{
      font-size: 40px;
      padding: 20px 0;
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