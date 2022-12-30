import axios from "axios";

const request = axios.create({
    baseURL:"http://101.43.161.114:8081",
    timeout:3000,
})

export default request