import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from "@/store";

Vue.config.productionTip = false

Vue.filter("makeComma", val => {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})

Vue.filter("timestampToDate", val => {
    if (val === '') return '';

    // 현재 Date 혹은 DateTime 데이터를 javaScript date 타입화
    var js_date = new Date(val);

    // 연도, 월, 일 추출
    var year = js_date.getFullYear();
    var month = js_date.getMonth() + 1;
    var day = js_date.getDate();

    var hour = js_date.getHours();
    var min = js_date.getMinutes();
    var sec = js_date.getSeconds();

    // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    // 최종 포맷 (ex - '2021-10-08')
    return year + '-' + month + '-' + day + " " + hour + ":" + min + ":" + sec;
})

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
