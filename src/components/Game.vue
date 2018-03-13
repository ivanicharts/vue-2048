<template>
  <div class="game-container">
    <div class="game-info">
      The Game
    </div>
    <div class="game-field">
      <div class="row" v-for="n in fieldSize" :key="n">
        <Cell v-for="x in fieldSize" :key="x + n"/>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from './Cell'
import { createField } from '../helpers/Field.js'

console.log('field', createField())

export default {
  name: 'game-2048',
  components: { Cell },
  data: () => ({ fieldSize: 4 })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .game-container {
    max-width: 316px;
    margin: 50px auto;    
  }

  .game-info {
    margin: 40px 0;
  }
</style>
