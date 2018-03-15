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


<style src="./App.css"></style>
