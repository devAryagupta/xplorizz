// filepath: src/utils/axiosConfig.ts
import axios from "axios";

// read your env var (CRA injects this at build time)
const API = process.env.REACT_APP_API_URL;

// set the default baseURL (optional, for new calls)
if (API) {
  axios.defaults.baseURL = API;
}

// intercept any request that still points at localhost:5000
axios.interceptors.request.use((config) => {
  if (config.url?.startsWith("http://localhost:5000")) {
    config.url = config.url.replace(
      "http://localhost:5000",
      API || ""
    );
  }
  return config;
});