# VUE

## 目录结构

node_modules:项目依赖

public：放置静态资源，放在这的资源webpack打包的时候会打包入dist文件夹中

* src：程序员源代码文件夹

> asserts文件夹，放置多个组件共用的静态资源，webpack打包时会当作一个模块打包JS文件夹中

> componets：放置非路由组件
>
> App.vue：唯一的根组件，Vue当中的组件
>
> main.js:程序入口文件，整个程序最先执行的文件

babel.config.js：配置文件

package.json:认为是项目身份证，记录项目叫什么，有哪些依赖，怎么运行

package-lock.json：缓存性文件

## 项目的其他配置

自动打开： "serve": "vue-cli-service serve --open --host=localhost"

eslint校验功能关闭

配置src别名：@代表src文件夹，将来文件过多找的时候方便很多

## 路由分析

vue-router

前端所谓的路由：kv键值对，key：url（地址栏中的路径），value：相应的路由组件

路由组件：Home首页路由组件，search搜索组件，login登录路由，register注册路由

非路由组件：header【首页/搜索页】，footer（在首页，搜索页），在登录|注册页面没有

## 非路由组件创建

1. 书写静态页面
2. 拆分组件
3. 获取服务器数据动态展示
4. 完成相应的动态业务逻辑

创建组件的时候，组件结构+组件样式+图片资源

项目采用less样式，浏览器不识别less样式，要通过less，less-loader处理样式

style加上lang=less

使用组件步骤

+ 创建&定义
+ 引入
+ 注册
+ 使用

## 路由组件配置

Home,Search,Login,Register

-components文件夹：放置非路由组件（共用全局组件）

-pages|views：放置路由组件



配置路由放置在router文件夹中

路由组件放在pages里，非路由放在components里

路由组件要在router文件夹中注册，使用的为组件的名字，非路由组件使用的时候以标签形式使用

注册完路由，所有组件身上都有\$route,$router属性



$route：获取路由信息【路径，query，params】

$router：进行编程式导航进行路由跳转





路由跳转

1. 声明式导航router-link，实现跳转
2. 编程式导航push|replace，实现跳转

编程式导航除了实现路由跳转，还能实现别的逻辑

## Footer组件显示与隐藏

v-if|v-show（更好）

Footer组件在Home，Search显示；在登录，注册时候隐藏

可以根据组件身上的$route获取当前路由信息，通过路径判断显示和隐藏，但是很麻烦，就不采用了

采用属性v-show="$route.meta.show"，然后去设置元信息的布尔值

配置路由时可以给路由配置路由元信息【meta】，路由要配置对象，key不能随便写

## 路由传参

路由传参，参数的写法

1. params参数，属于路径的一部分，配置路由的时候要占位，path:'/Search/:keyword?',加问号是可以选择传入或者不传入参数，否则会导致url变化
2. query参数，不属于路径的一部分，类似ajax中的queryString  /home?k=v

步骤：

1. 把v-model设置好，在data里设置传回的参数keyword（index.vue）

2. 路由里设置名称后在路由跳转的同时传回参数，这里用对象的方式，如：

   ```vue
   this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
   ```

3. 在跳转后的页面可以显示相应的数据来验证是否成功，\$route.params.keyword||$route.query.k。

### 问题

路由跳转传参时，对象写法可以是name或者path形式，但是path是不可以params传参的

使用undefined解决params参数传递空串的问题

```vue
this.$router.push({name:"search",params:{keyword:''||undefined},query:{k:this.keyword.toUpperCase()}})
```

**路由组件能不能传递props参数？**

答：可以，可以使用：

1. 布尔值写法  props:true,这种方法只能用于params
2. 对象写法 props:{a:1,b:2}
3. 函数写法  props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})

## NavigationDuplicated问题解决

通过给push方法传递相应的成功，失败的回调函数，捕获当前错误，但这种方法治标不治本。

this:当前组件实例（search）

this.$router属性：当前的属性，属性值VueRouter的实例，当入口文件注册路由的时候，添加的\$router|\$route属性。

所以正确方法是重写这个push方法

```js
/先保存一份原来的VueRouter原型对象的push
let originPush=VueRouter.prototype.push;
//重写，第一个参数告诉跳转位置
VueRouter.prototype.push=function(location,resolve,reject){
    if (resolve&&reject){
        //call和apply：都能调用函数一次并篡改函数上下文一次，但call传递参数用逗号隔开，apply方法执行传递数组
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
```

replace同理，暂时没写

## 三级联动组件----全局组件

在入口文件：main.js中引入并注册为全局组件，然后直接使用即可

```
import TypeNav from '@/pages/Home/TypeNav';

Vue.component(TypeNav.name,TypeNav);
```

## 非全局组件

在pages下新建组件文件夹，调好布局，样式和图片资源，在对应的pages下（Home）注册，引用，最后直接使用即可。

```vue
<script>
import ListContainer from '@/pages/Home/ListContainer';
export default {
    name: '',
    components:{
        ListContainer
    }
}
</script>
```

## axios封装

请求拦截器，响应拦截器，可以在发请求之前或服务器数据返回之后处理业务

```js
import axios from "axios";
//创造一个axios实例requests
const requests=axios.create({
    baseURL:"/api",//基础路径，发请求的时候自动加上的地址
    timeout:5000//请求超时的时间
});
//请求拦截器
requests.interceptors.request.use((config)=>{
    //config：配置对象里面的header重要
    return config;
});
//响应拦截器
requests.interceptors.response.use((res)=>{
    return res.data;//成功回调函数
},(error)=>{
    return Promise.reject(new Error('faile'));//响应失败
})
//对外暴露
export default requests;
```

## 接口统一管理

项目小：在组件的生命周期函数中发请求

项目大：axios.get(' ')，但是可能会很麻烦

在api文件夹下新建index.js

```js
import requests from "./request";

//三级联动组件的请求
export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'});//方法为get
```

在入口文件引入，使用，但是因为存在跨域问题，要配置代理，在vue.config.js下：

```
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
```

## nprogress进度条

请求时start,结束时done，注意引入样式"nprogress/nprogress.css"，在api文件下使用

```js
requests.interceptors.request.use((config)=>{
    nProgress.start();
    return config;
});

requests.interceptors.response.use((res)=>{
    nProgress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'));
})
```



## vuex

官方插件，用于储存组件中的共同数据，只在大型项目中用到

实现模块式开发，把大仓库分成很多小仓库

分别新建文件夹，作为小仓库，最后在index.js引入，用module引用。

```js
export default new Vuex.Store({
    modules:{
        home,
        search,
    }
});
```

## 三级联动的动态展示

将内容动态展示，需要向服务器请求数据并展示，

首先在相应组件下的script里dispatch一个action，

```vue
<script>
import { mapState } from 'vuex';
export default {
    name: 'TypeNav',
    //mounted表示组件挂载完毕，这一句表示组件挂载完毕后向服务器发出请求，请求名称叫categoryList
    mounted() {
        this.$store.dispatch('categoryList');
    },
    computed: {
        ...mapState({ categoryList: state => state.home.categoryList })
    }
};

</script>
```

发出请求之后需要在对应的仓库接受数据，在store的Home下，

```js
import { reqCategoryList } from "@/api";
const actions = {
    //定义对应的action，参数设置为对应的commit
    async categoryList({ commit }) {
        let result = await reqCategoryList();//发出请求，需要事先引入
        console.log(result);
        if (result.code == 200) {//接受服务器数据成功
            commit("CATEGORYLIST", result.data);//将返回的data传到mutation
        }
    }
};//书写逻辑，处理异步
```

```js
处理对应的mutation
const mutations = {
    CATEGORYLIST(state, categoryList) {//本身的参数state和接受的参数categoryList
        state.categoryList = categoryList;//刷新属性
    }
};//修改数据的方法
```

定义初始数据：

```js
const state = {
    categoryList: [],//初始值不能随便写，看服务器返回什么就写什么
};//数据存储的地方
```

这时Home仓库已经处理完毕来自服务器的数据，需要组件来展示数据，回到对应组件下的script

```vue
<script>
import { mapState } from 'vuex';//使用mapstate来展示
export default {
    name: 'TypeNav',
    //mounted表示组件挂载完毕，这一句表示组件挂载完毕后向服务器发出请求，请求名称叫categoryList
    mounted() {
        this.$store.dispatch('categoryList');
    },
    computed: {
        ...mapState({ categoryList: state => state.home.categoryList })
    }
};

</script>
```

最后就是展示部分：

```vue

<div class="item" v-for="(c1) in categoryList.slice(0, 16)" :key="c1.categoryId">v-for遍历返回的数组，
    <h3>
        <a href="">{{ c1.categoryName }}</a>
    </h3>
    <div class="item-list clearfix">
        <div class="subitem" v-for="(c2) in c1.categoryChild.slice(0, 9)" :key="c2.categoryId">
            <dl class="fore">
                <dt>
                    <a href="">{{ c2.categoryName }}</a>
                </dt>
                <dd>
                    <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                        <a href="">{{ c3.categoryName }}</a>
                    </em>
                </dd>
            </dl>
        </div>
    </div>
</div>
```

v-for是vue.js的循环语句，语法为：v-for=" a in b"，每一个对象为a，在b中遍历循环；slice是截取的意思，slice（0，16）意思是截取0到15，共16个元素

## 三级联动动态背景



## 二三级分类的显示与隐藏



## 防抖与节流

![image-20230222102712431](C:\Users\silverbullets\AppData\Roaming\Typora\typora-user-images\image-20230222102712431.png)

## 三级联动路由跳转



## search模块的商品分类和过渡动画

组件|元素的过渡动画必须有v-show或者v-if指令，动画分为开始阶段和结束阶段

## typenav优化服务器请求次数过多

在app跟组件当中发请求，因为跟组件只会执行一次

## 合并参数

合并params和query参数，加判断就行

## 模拟数据

用到mock.js模拟数据，对于服务器还暂时没有返回地址的组件可以使用，原理就是拦截掉发出的请求，并模拟返回结果，并没有真正的发送请求成功到后端

+ 先创建mock文件夹，用来提供假数据
+ 准备JSON数据（自己创建相应的文件）----注意要格式化
+ 把mock数据需要的图片放置到public文件夹中【public文件夹打包的时候会把相应资源放到dist文件夹中】
+ mock虚拟数据，创建mockServe.js，json数据格式引入的时候不需要再暴露了，他和图片都是默认暴露的，js才要刻意export对外暴露
+ mock的数据第一个参数是请求地址，第二个参数是请求的数据
+ 把mockserve.js文件在入口文件引入，执行，直接import就好

## 获取数据



## 轮播图

