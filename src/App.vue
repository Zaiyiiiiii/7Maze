<template>
    <div id="app">
        <div class="mosaic"></div>
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

    .mosaic{
        opacity: 0;
        position: fixed;
        height: 100%;
        width: 100%;
        background: #000;
        transition: all 0.15s ease-in-out;
        pointer-events: none;
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
