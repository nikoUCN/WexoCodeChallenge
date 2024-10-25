import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import MoviePage from '../components/MoviePage.vue';
import FavoritesPage from '../components/FavoritesPage.vue';
import DetailsPage from '../components/DetailsPage.vue';
import SearchPage from '../components/SearchPage.vue';

//defining routes 
const routes = [
    { path: '/', component: HomePage },
    { path: '/home', component: HomePage },
    { path: '/movies', component: MoviePage },
    { path: '/favorites', component: FavoritesPage },
    { path: '/details/:id', component: DetailsPage},
    { path: '/search', component: SearchPage}
];

//new instance of VueRouter with the routes defined earlier
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition){ 
        if(savedPosition){
            return savedPosition;
        }
        else{
            return { top: 0 };
        
        }
    }
});

export default router;


