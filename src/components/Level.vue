<template>
    <div class="level">
        <div v-for="(part,index) in level" :key="index" v-if="level">
            <div v-if="part.type == 'text'">
                {{part.context}}
            </div>
        </div>
        <div v-if="!level" @click="$router.go(-1)">
            {{"返回"}}
        </div>
        <div class="door">
            <input v-model="key" placeholder="GiveYourAnswer" class="keyhole" type="text">
            <transition name="fade">
                <div @click="checkAnswer" v-if="key" class="fuckkeyhole">Check</div>
            </transition>
        </div>
    </div>
</template>
<script>
    import levels from "../assets/levels.json"
    export default {
        data() {
            return {
                key: undefined
            }
        },
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
            }
        },
        methods:{
            checkAnswer(){
                this.$router.push(this.key)
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
    .level * {
        box-sizing: border-box;
    }
    .level {
        width: 50%;
        height: 100%;
        min-width: 300px;
        color: #fff;
        font-family: Cinzel, 仿宋, 宋体;
        font-size: 1.5em;
        line-height: 2.25em;
        padding-top: 4em;
        margin: auto;
    }
    .door {
        margin-top: 2em;
        max-width: 100%;
    }
    .fuckkeyhole {
        margin-top: 1em;
        font-size: 1.1em;
        line-height: 1.6em;
        padding: 0.1em 1em;
        border: 0.1em #fff solid;
        transition: all 0.2s;
        width: 100%;
        cursor: pointer;
    }
    .keyhole {
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
        width: 100%;
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
        opacity: 0.5
    }
</style>


