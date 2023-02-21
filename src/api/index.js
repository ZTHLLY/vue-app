import requests from "./request";

//三级联动组件的请求
export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'});

