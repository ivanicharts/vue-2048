<template>
  <div @click="f.moveRight()" class="game-container">
    <div class="game-info">
      The Game
    </div>
    <div class="game-container">
      <div class="active-cell-container">
        <Cell v-for="cell in field" :key="'' + cell.x + cell.y" :opts="cell" />
      </div>
      <div class="game-bg">
        <div class="row" v-for="n in fieldSize" :key="n">
          <Cell v-for="x in fieldSize" :key="x + n"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from './Cell'
import { Field } from '../helpers/Field.js'

const field = new Field();
console.log('field', field.getField())

export default {
  name: 'game-2048',
  components: { Cell },
  data: () => ({
    field: field.getField() , 
    fieldSize: 4,
    f: field
  })

  // computed: {
  //   field: () => {
  //     this.field = 
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .game-container {
    max-width: 316px;
    margin: 50px auto;  
    position: relative;  
  }

  .game-info {
    margin: 40px 0;
  }

  .game-bg {
    position: relative;
  }

  .active-cell-container {
    position: absolute;
  }
</style>
