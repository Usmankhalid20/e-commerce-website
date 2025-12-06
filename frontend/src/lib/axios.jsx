// import React from "react";
// import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL: "http://localhost:5000/api",
// import React from "react";
// import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL: "http://localhost:5000/api",
//     withCredentials: true,
//  })
 

import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // 👈 This sends cookies with requests
});

export default axiosInstance;