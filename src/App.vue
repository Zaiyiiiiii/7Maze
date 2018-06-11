<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  body,
  html,
  #app {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background: #000;
  }
  .fade-enter-active,
  .fade-leave-active {
      transition: all 1s;
  }
  .fade-enter,
  .fade-leave-to {
      opacity: 0 !important;
  }
</style>
