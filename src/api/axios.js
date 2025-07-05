// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://shared-whishlist.onrender.com/api/", 
});

export default api;
