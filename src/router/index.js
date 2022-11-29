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
    },
    {
        path: '/check',
        name: "check",
        component: () => import("@/views/AppEmailCheck"),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import("@/components/user/UserSignup")
    },
    {
        path: `/board`,
        name: 'board',
        component: () => import("@/views/AppBoard")
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    }
})

export default router
