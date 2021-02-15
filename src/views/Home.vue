<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img id="logo-image" src="@/assets/logo.png" alt="无法显示图片" />
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a href="#" class="login-out">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home'
}
</script>

<style>
.container {
  height: 100%;
  background-color: rgb(151, 158, 165);
}
/* 头部样式 */
.header {
  background-color: rgb(68, 88, 107);
}
#logo-image {
  height: 65px;
  width: 65px;
}
.middle {
  text-align: center;
}
.login-out {
  line-height: 60px;
  text-decoration: none;
}
.aside {
  background-color: rgb(31, 134, 36);
}
.main {
  background-color: rgb(123, 97, 214);
}
</style>
