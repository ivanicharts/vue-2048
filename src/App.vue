<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Header />
    <Game />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Game from './components/Game.vue'

export default {
  name: 'app',
  components: {
    Header,
    Game
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  background-image: linear-gradient(to bottom left, #222751, #202042);
  color: #fff;
  min-block-size: 100vh;
}
</style>
