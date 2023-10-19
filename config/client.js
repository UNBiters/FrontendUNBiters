import axios from "axios";
const https = require('https')

const agent = new https.Agent({
  rejectUnauthorized: false,
})
const client = axios.create({
  baseURL: "https://backend-un-biters.vercel.app/api/v1/",//"https://backend-un-biters-git-main-unbiters.vercel.app/api/v1/",// para ejecutar en local sin superbase"http://localhost:3005/api",
  httpsAgent: agent,
  headers: {
    "Content-Type": "application/json",
    
  }

});

export default client;
