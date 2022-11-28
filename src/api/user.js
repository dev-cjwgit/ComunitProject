import {apiInstance} from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
    await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function tokenRegeneration(uid, success, fail) {
    api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
    await api.post(`/user/refresh`, uid).then(success).catch(fail);
}

async function testFunc(params, success, fail) {
    api.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    console.log("Bearer " + sessionStorage.getItem("access-token"));
    await api.get(`/test`).then(success).catch(fail);
}

export {login, tokenRegeneration, testFunc};