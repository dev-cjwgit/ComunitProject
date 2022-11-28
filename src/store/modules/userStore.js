import router from "@/router";

import {login, tokenRegeneration, testFunc} from "@/api/user";
import store from "@/store";

async function autoCheckTokenWithParams(func, params) {
    let result = false;

    await func(params,
        ({data}) => {
            console.log("데이터 GET");
            result = data;
        },
        async (error) => {
            if (error.response.status === 401) {
                console.log("token 재발급 시도");
                await store.dispatch("userStore/tokenRegeneration", store.getters["userStore/getUserUidObserver"]);
            }

            func(params,
                ({data}) => {
                    console.log("데이터 GET");
                    result = data;
                },
                async () => {
                    console.log("로그인 만료");
                    result = false;
                }
            );
        })
    return result;
}


const userStore = {
    namespaced: true,
    state: {
        isLogin: false,
        uid: 0,
    },
    getters: {
        getisLoginObserver(state) {
            return state.isLogin;
        },
        getUserUidObserver(state) {
            return state.uid;
        },
    },
    actions: {
        async userLogin({commit}, user) {
            let result = false;
            let data = await autoCheckTokenWithParams(login, user);
            if (data !== false) {
                if (data.result === true) {
                    result = true;
                    commit("SET_IS_LOGIN", true);
                    commit("SET_USER_UID", data.uid);
                    sessionStorage.setItem("access-token", data["access-token"]);
                    sessionStorage.setItem("refresh-token", data["refresh-token"]);
                    await alert(data.msg);
                } else {
                    await alert(data.msg);
                }
            }
            return result;
        },

        async userLogout({commit}) {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_UID", -1);
            sessionStorage.removeItem("access-token");
            sessionStorage.removeItem("refresh-token");

        },

        async testFunc({commit}) {
            let data = await autoCheckTokenWithParams(testFunc, null);
            await console.log(data)
        },

        async tokenRegeneration({commit}, uid) {
            await tokenRegeneration(
                uid,
                ({data}) => {
                    if (data.result === true) {
                        let accessToken = data["access-token"];
                        sessionStorage.setItem("access-token", accessToken);
                    }
                },
                async (error) => {
                    if (error.response.status === 401) {
                        alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                        commit("SET_IS_LOGIN", false);
                        router.push({name: "login"});
                    }
                }
            );
        },

    },

    mutations: {
        SET_IS_LOGIN(state, payload) {
            state.isLogin = payload;
        },
        SET_USER_UID(state, payload) {
            state.uid = payload;
        }
    },
}

export default userStore;