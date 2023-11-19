import axios from "axios";
const https = require('https')

const agent = new https.Agent({
  rejectUnauthorized: false,
})
const client = axios.create({
  baseURL: "https://backend-un-biters.vercel.app/api/v1/",
  httpsAgent: agent,
  headers: {
    'Content-Type': 'application/json'
  }

});
export const myClient = {
  url: "http://127.0.0.1:3000/api/v1/"//"http://127.0.0.1:3000/api/v1/"
}

//https://backend-un-biters.vercel.app/api/v1/
export default client;