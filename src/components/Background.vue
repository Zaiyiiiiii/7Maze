<template>
    <div class="background" ref="background">
        <div v-for="line in lineCount">
            <span v-for="row in RowCount">{{1?"7Maze":str}}</span>
        </div>
    </div>
</template>
<style>
    .background {
        transform: translateX(-240px) rotateZ(-25deg);
        color: rgba(255, 255, 255, 0.2);
    }
    .background span{
        padding: 0;
    }
    .background > div {
        white-space: nowrap;
    }
    .background > div:nth-child(2n) {
        animation: move 1s linear infinite;
    }
    .background > div:nth-child(2n-1) {
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
                return Math.floor(this.bodyHeight / 53)
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
