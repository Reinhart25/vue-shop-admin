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
            <a href="#" class="login-out" @click.prevent="handleSignout()"
              >退出</a
            >
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          router
          unique-opened
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span slot="title">商品分类</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span slot="title">分类参数</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span slot="title">数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  // 获取token
  // if token 有 -> 继续渲染组件
  // token 没有 -> 登陆
  // new Vue 之前自动触发
  beforeCreate () {
    const token = localStorage.getItem('token')
    if (!token) {
      // token 没有 -> 登陆
      this.$router.push({ name: 'login' })
    }
  },
  methods: {
    handleSignout () {
      // 1. 清除token
      localStorage.clear()
      // 2. 提示
      this.$message.success('退出成功！')
      // 3. 来到login 组件
      this.$router.push({ name: 'login' })
    }
  }
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
  background-color: #545c64;
}
.main {
  background-color: rgb(123, 97, 214);
}
</style>
