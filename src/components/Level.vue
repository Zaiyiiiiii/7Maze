<template>
    <div class="level">
        <div class="levelpart" v-for="(part,index) in level" :key="index" v-if="level">
            <div v-if="part.type == 'text'" :style="part.color?('color:'+part.color):''">
                {{part.context}}
            </div>
            <div v-if="part.type=='image'">
                <img :src="part.path" alt="">
            </div>
            <div v-if="part.type == 'flash'">
                <object type="application/x-shockwave-flash" data="static/7maze.swf" width="500" height="400">
                    <param name="movie" value="static/7maze.swf" />
                    <param name="quality" value="high" />
                </object>
            </div>
            <div v-if="part.type == 'netease'">
                <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 :src="'//music.163.com/outchain/player?type=2&id='+part.id+'&auto=1&height=66'"></iframe>

            </div>
        </div>
        <div v-show="!level" @click="$router.go(-1)">
            <div>You Are Lost.</div>
            <div style="color: rgb(155, 32, 32)">你走错了，点这里回到上一关。</div>
            <div ref="words" style="height:2em;">
            </div>
        </div>
        <div class="door" v-if="level">
            <input v-model="key" :placeholder="levelName=='0'?'点这里，填入 “ 1 ”':'GiveYourAnswer'" class="keyhole" type="text">
            <transition name="fade">
                <background :str="level?(level[0].type=='text'?level[0].context:undefined):undefined" class="level-background"></background>
            </transition>
            <div @click="checkAnswer" :style="key?'':'opacity:0!important;cursor:initial!important;'" class="fuckkeyhole">Check</div>
        </div>
    </div>
</template>
<script>
    import Background from "./Background.vue"
    import levels from "../assets/levels.json"
    import words from "../assets/words.json"
    import random from "random-seed"
    import Typed from "typed.js"
    export default {
        components: {
            "background": Background
        },
        watch: {
            levelName() {
                scrollTo(0, 0)
                if (this.type) {
                    this.type.stop()
                    this.type.destroy()
                }
                this.type = undefined
                if (!this.level) {
                    setTimeout(() => {
                        this.createWords()
                    }, 200)
                }
            }
        },
        data() {
            return {
                key: undefined,
                type: undefined
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
            },
            words() {
                return words || []
            },
            createWords() {
                this.type = new Typed(this.$refs.words, {
                    strings: words[this.random()],
                    typeSpeed: 50,
                    backSpeed: 2,
                    backDelay: 1000,
                    fadeOut: true,
                    loop: true,
                    showCursor: false
                })
            }
        },
        methods: {
            checkAnswer() {
                this.$router.push(this.key.toLowerCase())
            },
            random() {
                return random.create(this.levelName).intBetween(0, words.length - 1)
            }
        },
        mounted() {
            console.log(this)
            if (!this.level) {
                this.createWords()
            }
        }
    }
</script>
<style>
    @font-face {
        font-family: Cinzel;
        src: url("../assets/Cinzel-Regular.ttf");
    }
    .level-background {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        opacity: 0;
        transition: all 1s;
    }
    .level * {
        box-sizing: border-box;
    }
    .level {
        width: 50%;
        min-height: 100%;
        min-width: 300px;
        color: #fff;
        font-family: Cinzel, 仿宋, 宋体;
        font-size: 1.5em;
        line-height: 2.25em;
        padding-top: 4em;
        margin: auto;
        padding-bottom: 2em;
    }
    .levelpart {
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
        background: rgba(0, 0, 0, 0);
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
    .keyhole:focus + .level-background {
        opacity: 1;
    }
    .keyhole:focus + .level-background + .fuckkeyhole {
        opacity: 0.3 !important;
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
        opacity: 0.5;
    }
</style>


