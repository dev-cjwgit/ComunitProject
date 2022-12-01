import {apiInstance} from "./index.js";

const api_headers = apiInstance();

async function getBoardKindList(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.get(`/board`).then(success).catch(fail);
}

async function getBoardList(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.get(`/board/${params.board_kind_uid}?page=${params.page}&range=${params.range}`).then(success).catch(fail);
}

async function getBoardPages(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.get(`/board/page/${params.board_kind_uid}/${params.page_range}`).then(success).catch(fail);
}

async function createBoard(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.post(`/board`, JSON.stringify(params)).then(success).catch(fail);
}

async function getBoardDetail(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.get(`/board/detail/${params}`).then(success).catch(fail);
}

async function getCommentList(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.get(`/board/comment/${params.board_uid}?page=${params.page}&range=${params.range}`).then(success).catch(fail);
}

async function getCommentPages(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.get(`/board/comment/page/${params.board_uid}/${params.range}`).then(success).catch(fail);
}

async function createComment(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.post(`/board/comment`, JSON.stringify(params)).then(success).catch(fail);
}

export {
    getBoardKindList,
    getBoardList,
    getBoardPages,
    createBoard,
    getBoardDetail,
    getCommentList,
    getCommentPages,
    createComment,
};