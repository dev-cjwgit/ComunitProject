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

export {getBoardKindList, getBoardList, getBoardPages};