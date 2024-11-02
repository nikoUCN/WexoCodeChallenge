import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { FontAwesomeIcon } from './plugins/fontAwesome';
import './styles/global.css';

// Create the app instance
const app = createApp(App);

// Register the font-awesome icon component
app.component('font-awesome-icon', FontAwesomeIcon);

// Register the router instance
app.use(router);

// Mount the app instance to the DOM
app.mount('#app');