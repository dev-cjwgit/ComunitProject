import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from "@/store";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(
    fas,
    far,
    fab
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.filter("makeComma", val => {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})

Vue.filter("timestampToDate", val => {
    if (val === '') return '';

    // 현재 Date 혹은 DateTime 데이터를 javaScript date 타입화
    var js_date = new Date(val);
    js_date.setHours(js_date.getHours() - 9);
    // 연도, 월, 일 추출
    var year = js_date.getFullYear();
    var month = js_date.getMonth() + 1;
    var day = js_date.getDate();

    var hour = js_date.getHours();
    var min = js_date.getMinutes();
    var sec = js_date.getSeconds();

    var js_date1 = new Date();
    var nyear = js_date1.getFullYear();
    var nmonth = js_date1.getMonth() + 1;
    var nday = js_date1.getDate();


    // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }
    if (nmonth < 10) {
        nmonth = '0' + nmonth;
    }

    if (nday < 10) {
        nday = '0' + nday;
    }

    if (nyear === year && nmonth === month && nday === day) {
        // 최종 포맷 (ex - '2021-10-08')
        return hour + ":" + min + ":" + sec;
    } else {
        return year + '-' + month + '-' + day + " " + hour + ":" + min + ":" + sec;

    }
});

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
