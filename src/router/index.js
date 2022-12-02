import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/AppHome.vue'

import store from "@/store";

Vue.use(VueRouter)

// NavigationDuplicated 방지
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => {
        if (err.name !== 'NavigationDuplicated') throw err;
    });
};

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
      path: '/mypage',
      name: 'mypage',
      component: () => import("@/components/user/MyPage")
    },
    {
        path: '/board',
        name: 'board',
        redirect: '/board/list',
        beforeEnter: authUser,
        component: () => import("@/views/AppBoard"),
        children: [
            {
                path: 'list',
                name: 'boardlist',
                component: () => import("@/components/board/BoardList")
            },
            {
                path: 'write',
                name: 'boardwrite',
                beforeEnter: authUser,
                component: () => import("@/components/board/BoardWrite")
            },
            {
                path: 'detail/:board_uid',
                name: 'boarddetail',
                beforeEnter: authUser,
                component: () => import("@/components/board/BoardDetail")
            },
        ],
    },
    {
        path: '/board/:board_kind_uid',
        name: 'boardkinduid',
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
