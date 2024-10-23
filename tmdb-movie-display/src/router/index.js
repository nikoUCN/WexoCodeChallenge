import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import MoviePage from '../components/MoviePage.vue';
import FavoritesPage from '../components/FavoritesPage.vue';

//defining routes 
const routes = [
    { path: '/', component: HomePage },
    { path: '/movies', component: MoviePage },
    { path: '/favorites', component: FavoritesPage }
];

//new instance of VueRouter with the routes defined earlier
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;


