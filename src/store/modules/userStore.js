import router from "@/router";

import {
    login,
    tokenRegeneration,
    testFunc,
    signup,
    checkEmail,
    signupRules,
    authUser,
    getMypage,
    setMypage,
    findMyPW
} from "@/api/user";
import store from "@/store";
import {updateBoard} from "@/api/board";

async function autoCheckTokenWithParams(func, params) {
    let result = false;

    await func(params,
        ({data}) => {
            store.commit("userStore/SET_IS_LOGIN", true);
            result = data;
        },
        async (error) => {
            if (error.response.status === 401) {
                await store.dispatch("userStore/tokenRegeneration", store.getters["userStore/getUserUidObserver"]);
                func(params,
                    ({data}) => {
                        result = data;
                    },
                    async (error) => {
                        if (error.response.status === 401) {
                            result = false;
                            store.commit("userStore/SET_IS_LOGIN", false);
                            store.commit("userStore/SET_USER_UID", -1);
                        }
                    }
                );
            } else {
                store.commit("userStore/SET_IS_LOGIN", false);
                store.commit("userStore/SET_USER_UID", -1);
                result = error.response.data;
            }
        });
    return result;
}


const userStore = {
    namespaced: true,
    state: {
        isLogin: false,
        uid: 0,
        name: '',
    },
    getters: {
        getisLoginObserver(state) {
            return state.isLogin;
        },
        getUserUidObserver(state) {
            return state.uid;
        },
        getUserNameObserver(state) {
            return state.name;
        }
    },
    actions: {
        async setMypage({commit}, params) {
            let result = false;
            let data = await autoCheckTokenWithParams(setMypage, params);
            if (data !== true) {
                if (data.result === true) {
                    result = true;
                }
            }
            return result;
        },
        async getMypage({commit}) {
            let result = false;

            await getMypage(null, ({data}) => {
                if (data.result === true) {
                    result = data;
                }
            });

            return result;
        },
        async userSignup({commit}, user) {
            let result = false;
            let data = await autoCheckTokenWithParams(signup, user);
            if (data !== false) {
                if (data.result === true) {
                    result = true;
                    await alert(data.msg);
                } else {
                    await alert(data.msg);
                }
            }

            return result;
        },

        async userLogin({commit}, user) {
            let result = false;
            let data = await autoCheckTokenWithParams(login, user);
            if (data !== false) {
                if (data.result === true) {
                    result = true;
                    commit("SET_IS_LOGIN", true);
                    commit("SET_USER_UID", data.uid);
                    commit("SET_USER_NAME", data.name);
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

        async findMyPW({commit}, params) {
            let result = false;
            let data = await autoCheckTokenWithParams(findMyPW, params);
            if (data !== true) {
                if (data.result === true) {
                    result = true;
                }
            }
            return result
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

        async checkEmail({commit}, token) {
            let result = false;

            await checkEmail(token, ({data}) => {
                if (data.result === true) {
                    alert(data.msg);
                    result = true;
                } else {
                    alert(data.msg);
                }
            }, async (error) => {
                await alert(error.response.data.msg);
            })

            return result;
        },

        async signupRules({commit}, params) {
            let result = false;
            await signupRules(params,
                async ({data}) => {
                    // console.log(data.result);
                    result = data.result;
                });
            return result;
        },

        async authUser({commit}) {
            let result = false;
            let data = await autoCheckTokenWithParams(authUser, null);
            if (data !== true) {
                if (data.result === true) {
                    result = true;
                }
            }
            // console.log(result);
            return result;
        }
    },

    mutations: {
        SET_USER_NAME(state, payload) {
            state.name = payload;
        },
        SET_IS_LOGIN(state, payload) {
            state.isLogin = payload;
        },
        SET_USER_UID(state, payload) {
            state.uid = payload;
        }
    },
}

export default userStore;