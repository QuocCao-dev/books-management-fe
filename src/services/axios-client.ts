import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:4200/api",
});

export default axiosClient;
