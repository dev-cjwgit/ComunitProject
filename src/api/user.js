import {apiInstance} from "./index.js";

const api = apiInstance();
const api_headers = apiInstance();


async function login(user, success, fail) {
    await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function signup(user, success, fail) {
    await api.post(`/user/signup`, JSON.stringify(user)).then(success).catch(fail);
}

async function checkEmail(token, success, fail) {
    await api.get(`/user/check/${token}`).then(success).catch(fail);
}


async function tokenRegeneration(uid, success, fail) {
    api_headers.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
    await api_headers.post(`/user/refresh`, uid).then(success).catch(fail);
}

async function testFunc(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.get(`/test`).then(success).catch(fail);
}

async function signupRules(params, success, fail) {
    await api.get(`/axios/signup/rules/${params.keyword}/${params.word}`).then(success).catch(fail);
}

async function authUser(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.get(`/user/auth`).then(success).catch(fail);
}

async function getMypage(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.get(`/user/mypage`).then(success).catch(fail);
}

async function setMypage(params, success, fail) {
    api_headers.defaults.headers["Authorization"] = "Bearer " + sessionStorage.getItem("access-token");
    await api_headers.post(`/user/mypage`, JSON.stringify(params)).then(success).catch(fail);
}

export {login, tokenRegeneration, testFunc, signup, checkEmail, signupRules, authUser, getMypage, setMypage};