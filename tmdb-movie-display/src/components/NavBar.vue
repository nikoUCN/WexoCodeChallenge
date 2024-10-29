<template>
    <div id="header">
        <nav>
            <ul id="navigation-bar">
                <li class="logo">
                    <router-link to="/">
                        <p><span>WEXO</span>Movies</p>
                    </router-link>
                </li>
                <div class="nav-links">
                    <!-- routing to the home, movie and favorites page using my routing/index.js-->
                    <li :class="{active: isActiveHome}"><router-link to="/home">Home</router-link></li>
                    <li :class="{active: isActiveMovies}"><router-link to="/movies">Movies</router-link></li>
                    <li @mouseover="isHovered = true" @mouseleave="isHovered = false">
                     <router-link to="/favorites">
                        <font-awesome-icon class="fa-icon" :class="{active: isActiveFavorite}" :icon="isHovered || isActiveFavorite ? ['fas', 'bookmark'] : ['far', 'bookmark']" />
                     </router-link>
                    </li>
                    <li class="search-icon">
                     <router-link to="/search">
                        <font-awesome-icon class="fa-icon" :icon="['fas', 'magnifying-glass']" :class="{active: isActiveSearch}"/>
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
        isHovered: false,
        isActiveHome: false,
        isActiveMovies: false,
        isActiveFavorite: false,
        isActiveSearch: false
      };
    },
    watch:{
        $route(to){
            this.isActiveHome = to.path === '/home';
            this.isActiveMovies = to.path === '/movies';
            this.isActiveFavorite = to.path === '/favorites';
            this.isActiveSearch = to.path === '/search';
        }
    },
    created(){
        this.isActiveHome = this.$route.path === '/home';
        this.isActiveMovies = this.$route.path === '/movies';
        this.isActiveFavorite = this.$route.path === '/favorites';
        this.isActiveSearch = this.$route.path === '/search';
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

nav ul li a:hover{
    color: rgb(108, 73, 235);
}

nav ul li.active a{
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

nav ul li .fa-icon.active{
    color: rgb(108, 73, 235);
}

nav ul .logo{
    padding: 20px 40px;
}

nav ul .logo p span{
    font-size: 30px;
    font-weight: bold;
    color: rgb(108, 73, 235);
    cursor: pointer;
    transition: color 1s ease;
}

nav ul .logo p{
    font-size: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;
}

nav ul .logo:hover p span{
    color: white;
}

nav ul .logo:hover p{
    color: rgb(108, 73, 235);
}



@media  (max-width: 850px) {

    .nav-links{
        padding: 40px 20px;
        gap: 30px;
    }
    
    nav ul li a{
        margin: 0;
    }

    nav ul li{
        margin: 0;
    }

    nav ul{
        display: flex;
        justify-content: space-between;
        margin: 0;
    }

    nav ul li .fa-icon{
        display: block;
        margin: 0;
    }

    nav ul li .fa-icon.active{
        display: block;
    }

    nav ul .logo{
    padding: 20px;
}

nav ul .logo p span{
    font-size: 15px;
}

nav ul .logo p{
    font-size: 10px;
}
}

  </style>