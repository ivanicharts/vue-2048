<template>
  <div 
    @transitionend="transitionEndCb(opts)"
    class="cell-container pulse" 
    :class="{ active: opts.value, [`cell-${opts.value}`]: opts.value }"
    :style="{ transform: `translate(${ opts.x * size + opts.x * margin }px, ${ opts.y * size + opts.y * margin }px)` }">
      {{ opts.value }}
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    opts: {
      default: () => ({}),
      type: Object
    },
    onTransitionEnd: {
      default: () => () => void 0,
      type: Function
    }
  },
  data: () => ({
    size: 75,
    margin: 4
  }),
  methods: {
    transitionEndCb(cellOpts) {
      // console.log('asasdasdasdasdd', args, this)
      if (cellOpts.mergeTarget) {
        this.onTransitionEnd();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cell-container {
    width: 75px;
    height: 75px;
    font-size: 20px;
    /* background-color: #1f2138; */
    background-color: #393d6d;
    margin: 0 2px;
    display: inline-block;
    transition: transform .3s, background-color .2s;
    transform: translate(0, 0);
  }

  .cell-container.active {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cell {
    /* display: block; */
    width: 100%;
    height: 100%;
  }

  .cell-2 {
    background-color: #0FE8E2;
  }

  .cell-4 {
    background-color: #ED5471;
  }

  .cell-8 {
    background-color: #FFB349;
  }
</style>
