<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->

    <h3>Installed CLI Plugins</h3>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <el-button type="success" disabled>成功按钮</el-button>
    <el-button type="primary" :loading="true">加载中</el-button>

    <h3></h3>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
