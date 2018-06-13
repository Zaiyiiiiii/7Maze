import Vue from "vue"
import Router from "vue-router"
import HelloWorld from "@/components/HelloWorld"
import Level from "@/components/Level"

Vue.use(Router)
export default new Router({
    mode: "hash",
    routes: [
        {
            path: "/",
            name: "index",
            redirect: "/0"
        },
        {
            path: "/:key",
            name: "Levels",
            component: Level,
            props: true
        }
    ]
})
