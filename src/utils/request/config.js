import axios from "axios";
import { ElMessage } from "element-plus";

axios.defaults.timeout = 50000;

const service = axios.create({
  // 判断是否处于开发环境
  // process.env.NODE_ENV === 'development'
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

service.interceptors.request.use(
  (config) => {
    // ...
    return config;
  },
  (error) => {
    ElMessage.error(`${error}`);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      redirect();
    } else {
      return response;
    }
  },
  () => {
    return Promise.reject();
  }
);

function redirect() {
  const local_url = window.location.href;
  localStorage.setItem("local_url", local_url);
  // const url = ""
  // const state = encodeURIComponent(
  //   encodeURIComponent(location.origin + "/" + location.hash)
  // )
  // const url_redirect = ""
  // window.location.replace(url_redirect)
}

export default service;