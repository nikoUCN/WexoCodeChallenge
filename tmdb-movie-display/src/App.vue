<!-- Always displaying the Navbar -->
<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>



<script>
import NavBar from './components/NavBar.vue';
import './styles/global.css';

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

