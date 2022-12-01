import store from "@/store";
import {
    createBoard,
    getBoardKindList,
    getBoardList,
    getBoardPages,
    getBoardDetail,
    getCommentList,
    getCommentPages,
    createComment
} from "@/api/board"

async function autoCheckTokenWithParams(func, params) {
    let result = false;

    await func(params,
        async ({data}) => {
            // console.log("데이터 GET1");
            result = data;
        },
        async (error) => {
            if (error.response.status === 401) {
                // console.log("token 재발급 시도");
                await store.dispatch("userStore/tokenRegeneration", store.getters["userStore/getUserUidObserver"]);

                await func(params,
                    ({data}) => {
                        // console.log("데이터 GET2");
                        result = data;
                    },
                    async (error) => {
                        if (error.response.status === 401) {
                            // console.log("로그인 만료");
                            result = false;
                        }
                    }
                );
            } else {
                result = error.response.data;
            }
        });
    // console.log("값 리턴 :( " + result + " )");
    return result;
}


const boardStore = {
    namespaced: true,
    state: {
        prev_page: 1,
        max_page: 10,
        comment_max_page: 10,
        board_kind_uid: 1,
        board_kind: [],
        board_list: [],
        board_detail: {
            "uid": 0,
            "board_kind_uid": 0,
            "user_uid": 0,
            "nickname": "작성자",
            "comment_count": 0,
            "title": "제목",
            "body": "<p>내용</p>",
            "sdate": 1669823966000,
            "udate": 1669823966000,
            "view_count": 0,
        },
        board_comment_list: [],
    },
    getters: {
        getCommentMaxPageObserver(state) {
            return state.comment_max_page;
        },
        getBoardCommentListObserver(state) {
            return state.board_comment_list;
        },

        getBoardDetailObserver(state) {
            return state.board_detail;
        },

        getMaxPageObserver(state) {
            return state.max_page;
        },

        getBoardKindObserver(state) {
            return state.board_kind;
        },

        getBoardListObserver(state) {
            return state.board_list;
        },

        getBoardKindUidObserver(state) {
            return state.board_kind_uid;
        },

        getPrevPageObserver(state) {
            return state.prev_page;
        }
    },
    mutations: {
        SET_COMMENT_LIST(state, payload) {
            state.board_comment_list = payload;
        },
        SET_BOARD_DETAIL(state, payload) {
            state.board_detail = payload;
        },
        SET_BOARD_KIND(state, payload) {
            state.board_kind = payload;
        },

        SET_BOARD_LIST(state, payload) {
            state.board_list = payload;
        },

        SET_MAX_PAGE(state, payload) {
            state.max_page = payload;
        },

        SET_BOARD_KIND_UID(state, payload) {
            state.board_kind_uid = payload;
        },

        SET_PREV_PAGE(state, payload) {
            state.prev_page = payload;
        },
        SET_COMMENT_MAX_PAGE(state, payload) {
            state.comment_max_page = payload;
        }

    },
    actions: {
        async createComment({commit}, params) {
            let result = false;
            let data = await autoCheckTokenWithParams(createComment, params);
            if (data !== true) {
                if (data.result === true) {
                    result = true;
                }
            }
            return result;
        },
        getCommentPages({commit}, params) {
            autoCheckTokenWithParams(getCommentPages, params).then((data) => {
                commit("SET_COMMENT_MAX_PAGE", data.data);
            });
        },

        getCommentList({commit}, params) {
            autoCheckTokenWithParams(getCommentList, params).then((data) => {
                if (data.result === true) {
                    commit("SET_COMMENT_LIST", data.data);
                }
            })
        },

        getBoardDetail({commit}, params) {
            autoCheckTokenWithParams(getBoardDetail, params).then((data) => {
                commit("SET_BOARD_DETAIL", data.data);
            })
        },

        getBoardKindList({commit}) {
            autoCheckTokenWithParams(getBoardKindList, null).then((data) => {
                if (data.result === true) {
                    commit("SET_BOARD_KIND", data.data);
                }
            });
        },

        getBoardList({commit, state}, params) {
            autoCheckTokenWithParams(getBoardList, params).then((data) => {
                if (data.result === true) {
                    commit("SET_BOARD_LIST", data.data);
                }
            });

            // TODO: range 범위 설정
            let response = autoCheckTokenWithParams(getBoardPages, {
                board_kind_uid: state.board_kind_uid,
                page_range: 10,
            }).then((data) => {
                if (data.result === true) {
                    commit("SET_MAX_PAGE", response.data);
                }
            });
        },

        getBoardPages({commit}, params) {
            autoCheckTokenWithParams(getBoardPages, params).then((data) => {
                if (data.result === true) {
                    commit("SET_MAX_PAGE", data.data);
                }
            })
        },

        async createBoard({commit, state}, params) {
            let result = false;
            let data = await autoCheckTokenWithParams(createBoard, params);
            if (data !== true) {
                if (data.result === true) {
                    result = true;
                }
            }
            return result;
        },
    },


}

export default boardStore;