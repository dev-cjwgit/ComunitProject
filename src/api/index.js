import axios from "axios";

// local vue api axios instance
function apiInstance() {
    return axios.create({
        baseURL: "http://183.97.128.216:9999",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    });
}

export {apiInstance};
