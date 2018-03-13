<template>
  <header class="header">
    <div class="logo">kerob</div>
  </header>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    border-top: 5px solid #0FE8E2;
    text-align: left;
    padding: 20px 25px;
    color: #0FE8E2;
  }

  .logo {
    font-size: 24px;
    font-weight: 500;
  }
</style>
