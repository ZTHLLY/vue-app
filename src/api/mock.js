import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css"

const MockRequests=axios.create({
    baseURL:"/mock",//基础地址
    timeout:5000
});

MockRequests.interceptors.request.use((config)=>{
    nProgress.start();
    return config;
});

MockRequests.interceptors.response.use((res)=>{
    nProgress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'));
})

export default MockRequests;