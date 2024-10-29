<template>
  <NavBar />
  <div class="favorite-header-container">
    <h1>Favorites</h1>
  </div>
  <div class="favorite-movie-container">
    <div v-if="favoriteMovies.length" class="favorite-movie-list">
      <div v-for="movie in favoriteMovies" :key="movie.id" class="favorite-movie-box">
        <router-link :to="`/details/${movie.id}`"><img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie poster" /></router-link>
        <div class="movie-title">
          <a><router-link :to="`/details/${movie.id}`">{{ movie.title }}</router-link></a>
        </div>
      </div>
    </div>
    <div v-else class="no-movies-text">
      <p>No favorite movies yet</p>
    </div>
  </div>
    
</template>


  <script>
  import NavBar from './NavBar.vue';

  export default {
    name: 'FavoritesPage',
    components: {
      NavBar
    },
    data(){
      return{
        favoriteMovies: [] // Array to store the favorite movies
      };
    },
    async created(){
      // Fetching the favorite movies from session storage
      const favoriteMovies = JSON.parse(sessionStorage.getItem('favorites')) || [];
      this.favoriteMovies = favoriteMovies; // Setting the favorite movies
    }
  }
  </script>
  
  <style scoped>
  .favorite-header-container {
    display: flex;
    justify-content: flex-start;
    padding-top: calc(var(--navbar-height) + 20px);
    padding-left: 30px;
    
  }

  .favorite-header-container h1{
    font-size: 40px;
    color: white;
    font-weight: bold;
  }

  .favorite-movie-container {
    display: flex;
    justify-content: flex-start;
  }
  

  .favorite-movie-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 20px;
      gap: 20px;
      width: 100%;
  }

  .favorite-movie-box{
    transition: transform 0.5s ease;
  }

  .favorite-movie-box:hover{
    transform: scale(1.02);
  }

  .favorite-movie-box img{
    width: 100%;
    height: auto;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
    cursor: pointer;
    height: 90%;
  }
  
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

  .no-movies-text{
    display: flex;
    justify-content: center;
    padding-top: 150px;
    width: 100%;
  }

  .no-movies-text p{
    font-size: 20px;
    color: white;
  }

  @media only screen and (max-width: 850px){

.favorite-movie-container{
display: flex;
justify-content: center;
width: 850px;
}

.favorite-movie-list{
grid-template-columns: repeat(3, 1fr);
}

.load-more-button-container{
display: flex;
justify-content: center;
width: 850px
}
}
  </style>