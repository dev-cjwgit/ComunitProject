import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from "@/store";

Vue.config.productionTip = false

Vue.filter("makeComma", val => {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
