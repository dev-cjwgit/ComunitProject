import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/AppHome.vue'

import store from "@/store";

Vue.use(VueRouter)

const authUser = async (to, from, next) => {
    let token = sessionStorage.getItem("access-token");
    if (token) {
        let result = await store.dispatch("userStore/authUser")
        if (result === true) {
            next();
        } else {
            alert("로그인이 필요합니다.");
            await router.push({name: 'login'});
        }
    } else {
        alert("로그인이 필요합니다.");
        await router.push({name: 'login'});
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
        beforeEnter: authUser,
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
