import axios from "axios";

const httpConfig = {
  baseURL: process.env.BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  // },
};

const http = axios.create(httpConfig);
http.defaults.timeout = 20000;

export default http;
