<template>
  <div id="app">
    <Header></Header>
    <!-- 路由出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
    <Select></Select>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Select from './components/select.vue';
import router from './router';
import Header from './components/Header/index.vue';
import Footer from './components/Footer/index.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    Select,
    router,
    Header,
    Footer
  },
  mounted(){
    this.$store.dispatch('categoryList');//挂载组件
  },
}
</script>

<style scoped></style>
