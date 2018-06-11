<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  body, html, #app {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background: #000;
  }
</style>
