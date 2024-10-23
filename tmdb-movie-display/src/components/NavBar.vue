<template>
    <div id="header">
        <nav>
            <ul id="navigation-bar">
                <li class="logo">
                    <router-link to="/">
                        <img src="@/assets/wexologo.svg" class="logo-img" />
                    </router-link>
                </li>
                <div class="search-bar">
                    <input type="text" placeholder="Search for movies" />
                    <font-awesome-icon class="fa-icon" :icon="['fas', 'magnifying-glass']" />
                </div>
                <div class="nav-links">
                    <!-- routing to the home, movie and favorites page using my routing/index.js-->
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/movies">Movies</router-link></li>
                    <li @mouseover="isHovered = true" @mouseleave="isHovered = false">
                     <router-link to="/favorites">
                        <font-awesome-icon class="fa-icon" :icon="isHovered ? ['fas', 'bookmark'] : ['far', 'bookmark']" />
                     </router-link>
                </li>
                </div>
            </ul>
        </nav>
    </div>
  </template>
  




  <script>
  export default {
    name: 'NavBar',
    data(){
      return{
        isHovered: false
      };
    }
  }
  </script>
  



  <style scoped>

/*Styling of the navigation bar*/
nav{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: rgb(11, 27, 56, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
}

/*Styling of the navigation bar search*/
.search-bar{
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-bar input{
    padding: 10px;
    border-radius: 30px;
    border: none;
    margin: 20px;
    width: 300px;
    font-size: 15px;
}

.search-bar .fa-icon{
    font-size: 20px;
    color: white;
    margin: 30px 0;
    cursor: pointer;
}

/*Styling of the navigation bar titles*/
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  width: 100%;
}

nav ul li{
    display: inline-block;
}

.nav-links{
    display: flex;
    margin-left: auto;
}

nav ul li a{
    font-size: 20px;
    text-decoration: none;
    font-weight: bold;
    color: white;
    transition: color 0.3s ease;
    margin: 30px;
}

nav ul li.logo {
  margin-left: 0;
}

nav ul li a:hover{
    color: rgb(108, 73, 235);
}

nav ul li .fa-icon{
    font-size: 20px;
    color: white;
    transition: color 0.5s ease;
}

nav ul li .fa-icon:hover{
    color: rgb(108, 73, 235);
}

.logo-img{
    height: 110px;
}

  </style>