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
          <el-submenu :index="item1.order.toString()" v-for="(item1, index) in menus" :key="index">

            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item1.authName }}</span>
            </template>

            <el-menu-item
            :index="item2.path"
            v-for="(item2, index) in item1.children" :key="index">
              <i class="el-icon-menu"></i>
              <span>{{ item2.authName }}</span>
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
  data () {
    return {
      menus: []
    }
  },
  // 获取token
  // if token 有 -> 继续渲染组件
  // token 没有 -> 登陆
  // new Vue 之前自动触发
  created () {
    this.getMenus()
  },
  methods: {
    // 获取导航数据
    async getMenus () {
      const res = await this.$http.get('menus')
      console.log(res)
      this.menus = res.data.data
    },
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
