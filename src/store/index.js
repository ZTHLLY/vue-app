import Vue from "vue";
import Vuex from 'vuex';
import home from "./home";
import search from "./search";
Vue.use(Vuex);

// const state={};//数据存储的地方
// const mutations={};//修改数据的方法
// const actions={};//书写逻辑，处理异步
// const getters={};//计算属性，简化仓库数据，


export default new Vuex.Store({
    modules:{
        home,
        search,
    }
});