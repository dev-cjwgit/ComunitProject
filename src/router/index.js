import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/AppHome.vue'

import store from "@/store";

Vue.use(VueRouter)

const authUser = async (to, from, next) => {
    let token = sessionStorage.getItem("access-token");
    let isLogin = store.getters["userStore/getisLoginObserver"];
    if (token) {
        await store.dispatch("userStore/authUser")
    }

    if (!isLogin) {
        alert("로그인이 필요합니다.");
        router.push({name: 'login'});
    } else {
        next();
    }
}

async function autoCheck(func, params) {
    await func(params,
        ({data}) => {
            return data;
        },
        async (error) => {
            if (error.response.status === 401) {
                await store.dispatch("userStore/tokenRegeneration", store.getters["userStore/getUserUidObserver"]);
            }

            func(params,
                ({data}) => {
                    return data;
                },
                async () => {
                    return false;
                }
            );
        })
}

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/AppLogin.vue"),
    }
]

const router = new VueRouter({
    routes,
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    }
})

export default router
