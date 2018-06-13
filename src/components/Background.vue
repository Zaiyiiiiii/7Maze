<template>
    <div class="background" ref="background">
        <div class="background-word" v-for="line in lineCount">
            <span v-for="row in RowCount">{{1?"7Maze":str}}</span>
        </div>
        <div class="background-pic"></div>
    </div>
</template>
<style>
    .background {
        transform: translateX(-360px) translateY(-15em) rotateZ(-25deg);
        color: rgba(255, 255, 255, 0.2);
        font-family: Cinzel;
        pointer-events: none;
    }
    .background span {
        padding: 0;
    }
    .background > div {
        white-space: nowrap;
    }
    .background > .background-word:nth-child(2n) {
        animation: move 1s linear infinite;
    }
    .background > .background-word:nth-child(2n-1) {
        animation: move 1s linear infinite reverse;
    }
    @keyframes move {
        from {
            transform: translateX(78px);
        }
        to {
            transform: translateX(0);
        }
    }
    .background-pic {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-image: url("/static/bg2.jpg");
        animation: none;
        z-index: -2;
        filter: grayscale(0.6);
        opacity: 0.2;
        transform: rotateZ(25deg) translateY(15em) translateX(360px);
        background-size: cover
    }
</style>
<script>
    export default {
        props: {
            str: undefined
        },
        computed: {
            RowCount() {
                return Math.floor(this.bodyWidth / 40)
            },
            lineCount() {
                return Math.floor(this.bodyHeight / 46) * 2
            },
            bodyHeight() {
                return document.querySelector("body").scrollHeight
            },
            bodyWidth() {
                return document.querySelector("body").scrollWidth
            }
        },
        data() {
            return {
            }
        },
        mounted() {

        }
    }
</script>
