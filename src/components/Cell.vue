<template>
  <div class="cell-container" :class="{ active: opts.value  }">
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
    background-color: #1f2138;
    margin: 0 2px;
    display: inline-block;
  }

  .cell-container.active {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
