import requests from "./request";
import MockRequests from "./mock";

//三级联动组件的请求
export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'});
export const reqBannerList=()=>MockRequests({url:'/banner',method:'get'});
export const reqFloorList=()=>MockRequests({url:'/floor',method:'get'});
