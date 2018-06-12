// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


router.beforeEach((to, from, next) => {
    let mosaic = document.querySelector(".mosaic")
    if (mosaic) {
        mosaic.style.opacity = "1"
        document.body.className = "shake"
        setTimeout(() => {
            mosaic.style.opacity = "0"
            document.body.className = ""
            next()
        }, 300)
    }
    else{
        next()
    }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
