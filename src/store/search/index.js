import { reqSearchList } from "@/api";

const state = {
    searchList: {},
};//数据存储的地方
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList;
    }

};//修改数据的方法
const actions = {
    async getSearchList({ commit }, params) {
        let result = await reqSearchList(params);
        console.log(result);
        commit("GETSEARCHLIST",result.data);
    }
};//书写逻辑，处理异步
const getters = {};//计算属性，简化仓库数据，

//对外暴露
export default {
    state,
    mutations,
    actions,
    getters,
}