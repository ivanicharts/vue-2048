<template>
  <div
    tabindex="0"
    ref="gameField"
    @keydown.right="f.moveRight" 
    @keydown.left="f.moveLeft" 
    @keydown.up="f.moveUp" 
    @keydown.down="f.moveDown"
    @swipeleft="f.moveLeft" 
    @swiperight="f.moveRight" 
    @swipeup="f.moveUp" 
    @swipedown="f.moveDown" 
    class="game-container">
    <div class="game-info">
      ...
    </div>

    <div class="nav">
      <div class="actions">
        <button class="btn" @click="reset">New game</button>
      </div>
      <div class="stats">
        <div class="score">Score: <strong>{{ state.score }}</strong></div>
      </div>
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
import { throttle } from 'lodash'
import Cell from './Cell'
import { Field } from '../helpers/Field.js'

const field = new Field();
console.log('field', field.getField())

const throttleTime = 400;

export default {
  name: 'game-2048',
  components: { Cell },
  data: () => ({
    state: field.getState(),
    field: field.getField(), 
    fieldSize: 4,
    f: field
  }),

  methods: {
    deleteCells() {
      console.log('deleted')
    },
    reset() {
      const newField = new Field();

      this.field = newField.getField();
      this.state = newField.getState();
      this.f = newField;
    }
    // moveRight: throttle(field.moveRight.bind(field), throttleTime),
    // moveLeft: throttle(field.moveLeft.bind(field), throttleTime),
    // moveUp: throttle(field.moveUp.bind(field), throttleTime),
    // moveDown: throttle(field.moveDown.bind(field), throttleTime),
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
    margin: 25px auto;  
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

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stats {
    color: rgba(255, 255, 255, .8);
    font: 20px;
  }
</style>
