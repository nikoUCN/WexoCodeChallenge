import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { FontAwesomeIcon } from './plugins/fontAwesome';
import './styles/global.css';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');