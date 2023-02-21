import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/Login'
import home from '@/pages/Home'
import register from '@/pages/Register'
import Search from '@/pages/Search'
import VueRouter from 'vue-router'
// import { search } from 'core-js/fn/symbol';

let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}


Vue.use(Router);
const router=new Router({
    routes:[
        {
            path:'/Login',
            component:login,
            name: login,
            meta:{show:false}
        },
        {
            path:'/Home',
            component:home,
            name: home,
            meta:{show:true}
        },
        {
            path:'/Register',
            component:register,
            name: register,
            meta:{show:false}
        },
        {
            path:'/Search/:keyword?',
            component:Search,
            name: "search",
            meta:{show:true}
        },
        {
            path: '*',
            redirect:"/Home"
        }
        ]
})
export default router