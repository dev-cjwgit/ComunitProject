import {apiInstance} from "./index.js";

const api_headers = apiInstance();

async function getBoardKindList(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.get(`/board`).then(success).catch(fail);
}

async function getBoardList(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.get(`/board/${params}`).then(success).catch(fail);
}

export {getBoardKindList, getBoardList};