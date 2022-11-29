import router from "@/router";
import store from "@/store";
import {getBoardKindList, getBoardList} from "@/api/board"

async function autoCheckTokenWithParams(func, params) {
    let result = false;

    await func(params,
        async ({data}) => {
            console.log("데이터 GET1");
            result = data;
        },
        async (error) => {
            if (error.response.status === 401) {
                console.log("token 재발급 시도");
                await store.dispatch("userStore/tokenRegeneration", store.getters["userStore/getUserUidObserver"]);

                await func(params,
                    ({data}) => {
                        console.log("데이터 GET2");
                        result = data;
                    },
                    async (error) => {
                        if (error.response.status === 401) {
                            console.log("로그인 만료");
                            result = false;
                        }
                    }
                );
            } else {
                result = error.response.data;
            }
        });
    console.log("값 리턴");
    return result;
}


const boardStore = {
    namespaced: true,
    state: {
        board_kind: [],
        board_list: [],
    },
    getters: {
        getBoardKindObserver(state) {
            return state.board_kind;
        },

        getBoardListObserver(state) {
            return state.board_list;
        }
    },
    mutations: {
        SET_BOARD_KIND(state, payload) {
            state.board_kind = payload;
        },

        SET_BOARD_LIST(state, payload) {
            state.board_list = payload;
        }


    },
    actions: {
        async getBoardKindList({commit}) {
            let data = await autoCheckTokenWithParams(getBoardKindList, null);
            if (data !== true) {
                if (data.result === true) {
                    commit("SET_BOARD_KIND", data.data);
                }
            }
        },

        async getBoardList({commit}, board_uid) {
            let data = await autoCheckTokenWithParams(getBoardList, board_uid);
            if (data !== true) {
                if (data.result === true) {
                    commit("SET_BOARD_LIST", data.data);
                }
            }
        }
    },


}

export default boardStore;