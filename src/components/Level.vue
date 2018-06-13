<template>
    <div class="level-container" :style="{'overflow-y':(level?'':'hidden')}">
        <div class="level">
            <div class="levelpart" v-for="(part,index) in level" :key="index" v-if="level">
                <div v-if="part.type == 'text'" :style="part.color?('color:'+part.color):''">
                    {{part.context}}
                </div>
                <div v-if="part.type=='image'">
                    <img :src="part.path" alt="">
                </div>
                <div v-if="part.type == 'netease'">
                    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 :src="'//music.163.com/outchain/player?type=2&id='+part.id+'&auto=1&height=66'"></iframe>
                </div>
                <div v-if="part.type == 'start'">
                    <transition name="fake-fade">
                        <div class="title-main" v-if="intoKeyhole">
                            <div class="title">
                                <span style="font-size:1.7em">7</span>Maze
                            </div>
                        </div>
                    </transition>
                    <transition name="fake-fade">
                        <div v-if="!intoKeyhole">
                            <div>您好！我们诚挚的邀请您成为我们天龙帮中的一员，但于此之前，请原谅我们冒昧的对您进行一项测试，我们需要确认您是否有相应的资格。</div>
                            <div>如果您接受我们的测试。请把本函翻到第『1』页。</div>
                            <div>最终的谜底即是我们的联系方式，期待您的来访。</div>
                        </div>
                    </transition>

                </div>
            </div>
            <div v-show="!level" @click="$router.go(-1)">
                <div>You Are Lost.</div>
                <div style="color: rgb(155, 32, 32)">你走错了，请重新来过。</div>
                <div ref="words" style="height:2em;">
                </div>
            </div>
            <div class="door" v-if="level">
                <hr>
                <input ref="keyhole" @keydown.enter="checkAnswer" :style="{width:(key?'68%':'100%')}" v-model="key" :placeholder="levelName=='0'?'ClickToStart':'GiveYourAnswer'" class="keyhole" type="text">
                <transition name="fade">
                    <background :str="level?(level[0].type=='text'?level[0].context:undefined):undefined" class="level-background"></background>
                </transition>
                <transition name="fade" mode="out-in">
                    <div :style="{transform:(key?'scaleX(1)':'scaleX(0)')}" v-if="key" @click="checkAnswer" class="fuckkeyhole">Fine</div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import Background from "./Background.vue"
    import levels from "../assets/levels.json"
    import words from "../assets/words.json"
    import random from "random-seed"
    import Typed from "typed.js"
    import sleep from "then-sleep"
    export default {
        components: {
            "background": Background
        },
        watch: {
            levelName() {
                scrollTo(0, 0)
                window.navigator.vibrate(
                    this.level ?
                        [50,30,50] :
                        [200, 30, 200, 30, 200, 400, 400, 30, 400, 30, 400, 400, 200, 30, 200, 30, 200]
                )
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
                type: undefined,
                music: undefined,
                intoKeyhole: false
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
            this.music = new Audio()
            this.music.src = "/static/music.mp3"
            this.music.loop = true
            console.log(this.music.volume)
            this.$refs.keyhole.addEventListener("focus", async () => {
                this.intoKeyhole = true
                this.music.volume = 0
                this.music.play()
                for (let i = 0; i < 1; i += 0.05) {
                    this.music.volume = i
                    await sleep(30)
                }
            })
            this.$refs.keyhole.addEventListener("blur", async () => {
                this.intoKeyhole = false
                for (let i = 1; i > 0; i -= 0.05) {
                    this.music.volume = i
                    await sleep(30)
                }
                this.music.pause()
            })
        }
    }
</script>
<style>
    @font-face {
        font-family: Cinzel;
        src: url("../assets/Cinzel-Regular.ttf");
    }
    .title-main {
        transition: all 1.5s;
        position: fixed;
        left: 0;
        right: 0;
        top: 20%;
        margin: auto;
    }
    .fake-fade-enter-active,
    .fake-fade-leave-active {
    }
    .fake-fade-enter,
    .fake-fade-leave-to {
        opacity: 0;
    }
    .fake-fade-enter > .title,
    .fake-fade-leave-to > .title {
        filter: blur(25px);
    }

    .level-container {
        height: calc(100% - 7em);
        overflow-y: auto;
    }
    .title {
        transition: all 1.5s;
        width: 100%;
        text-align: center;
        font-size: 3em;
        text-shadow: goldenrod 0 0 15px;
        user-select: none;
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
        max-width: 50%;
        min-width: 300px;
        color: #fff;
        font-family: Cinzel, SIMFANG, FANG;
        font-size: 1.5em;
        line-height: 2.25em;
        padding-top: 4em;
        margin: auto;
        padding-bottom: 2em;
        overflow-y: auto;
    }
    .levelpart {
        cursor: default;
        position: relative;
    }
    .door {
        margin: auto;
        bottom: 1em;
        width: 50%;
        max-width: 100%;
        white-space: nowrap;
        position: relative;
        position: fixed;
        max-width: 50%;
        min-width: 300px;
    }
    .door > hr {
        margin-bottom: 1em;
    }
    .fuckkeyhole {
        margin-left: 1%;
        font-size: 1.1em;
        line-height: 1.6em;
        padding: 0.1em 0.5em;
        border: 0.1em #fff solid;
        transition: all 0.2s;
        cursor: pointer;
        display: inline-block;
        width: 30%;
        position: absolute;
        right: 0;
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
        font-family: Cinzel, SIMFANG;
        transition: all 0.2s;
        display: inline-block;
    }
    .keyhole:focus {
        background: #fff;
        color: #009933;
    }
    .keyhole:focus + .level-background {
        opacity: 1;
    }
    .keyhole:focus + .level-background + .fuckkeyhole {
        opacity: 0.3;
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


