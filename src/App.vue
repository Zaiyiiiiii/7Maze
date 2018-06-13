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
        name: 'App',
        mounted() {
            document.onkeydown = e => {
                if(e.keyCode == 37){
                    this.$router.go(-1)
                }
                if(e.keyCode == 39){
                    this.$router.go(1)
                }
            }
        }
    }
</script>

<style>
    @import url("csshake/dist/csshake.min.css");
    @font-face {
        font-family: "FANG";
        src: url("/static/SIMFANG.ttf") format("truetype");
        font-style: normal;
        font-weight: normal;
    }

    body {
        background: #000;
    }
    body,
    html,
    #app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    .shake {
        animation: shake-opacity 0.5s ease-in-out 2;
    }
    .mosaic {
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
