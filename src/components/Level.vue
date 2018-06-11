<template>
    <div class="level">
        <div v-for="part in level">
            <div v-if="part.type == 'text'">
                {{part.context}}
            </div>
        </div>
        <div class="door">
            <input ref="door" placeholder="GiveYourAnswer" class="keyhole" type="text">
            <div v-if="this.$refs.door?this.$refs.door.value:false" class="fuckkeyhole">Check</div>
        </div>
    </div>
</template>
<script>
    import levels from "../assets/levels.json"
    export default {
        computed: {
            levelName() {
                return this.$route.params.key
            },
            level() {
                if (levels[this.levelName]) {
                    return levels[this.levelName]
                }
                return undefined
            },
            levels() {
                return levels
            },
            ifKey() {
                if (!this.$refs.door) {
                    return false
                }
                return this.$refs.door.value
            }
        },
        mounted() {
            console.log(this)
        }
    }
</script>
<style>
    @font-face {
        font-family: Cinzel;
        src: url("../assets/Cinzel-Regular.ttf");
    }
    .level {
        width: 50%;
        height: 100%;
        min-width: 300px;
        color: #fff;
        font-family: Cinzel, 仿宋, 宋体;
        box-sizing: border-box;
        font-size: 1.5em;
        line-height: 2.25em;
        padding-top: 4em;
        margin: auto;
    }
    .door {
        margin-top: 2em;
    }
    .fuckkeyhole {
        font-size: 1.1em;
        line-height: 1.6em;
        padding: 0.1em 1em;
        border: 0.1em #009933 solid;
        transition: all 0.2s;
    }
    .keyhole {
        display: inline-block;
        font-size: 1.1em;
        box-sizing: border-box;
        border: none;
        outline: none;
        background: #000;
        padding: 0.45em;
        padding-left: 1em;
        height: 2em;
        color: #fff;
        font-family: Cinzel, 仿宋, 宋体;
        transition: all 0.2s;
        max-width: 100%;
    }
    .keyhole:focus {
        background: #fff;
        color: #009933;
    }
    .door .keyhole::-webkit-input-placeholder {
        color: #fff;
        transition: all 0.2s;
    }
    .door .keyhole:-ms-input-placeholder {
        color: #fff;
        transition: all 0.2s;
    }
    .door .keyhole:focus::-webkit-input-placeholder {
        color: #009933;
        opacity: 0.3;
    }
    .door .keyhole:focus:-ms-input-placeholder {
        color: #009933;
        opacity: 0.3;
    }
    .keyhole:focus + .fuckkeyhole {
        color: #fff;
        border-color: #fff;
    }
</style>


