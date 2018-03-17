<template>
  <div
    tabindex="0"
    ref="gameField"
    @keydown.right="f.moveRight()" 
    @keydown.left="f.moveLeft()" 
    @keydown.up="f.moveUp()" 
    @keydown.down="f.moveDown()" 
    @click="f.moveUp()" 
    class="game-container">
    <div class="game-info">
      The Game
    </div>
    <div class="game-container">
      <div class="active-cell-container">
        <Cell v-for="cell in field" :key="cell.key" :opts="cell" :onTransitionEnd="f.deleteUnnecessaryCells.bind(f)" />
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
  }),

  methods: {
    deleteCells() {
      console.log('deleted')
    }
  },

  mounted() {
    console.log('ref', this.$refs.gameField.focus())
  }

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
