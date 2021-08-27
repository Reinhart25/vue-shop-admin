<template>
  <!-- 根据路由 渲染菜单 -->
  <!-- 我们需要菜单的名字和图标 -->
  <el-menu
    :collapse="isCollapse"
    collapse-transition
    router
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="route in routes">
      <!-- 判断是否有子路由 -->
      <!-- 1. 没有子路由 -->
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>

      <el-submenu
        v-for="(item, i) in $router.options.routes"
        :index="i + ''"
        key="i"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <!-- 2. 存在子路由 -->
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isCollapse', 'asyncRoutes']),
    routes () {
      // 这里只做了一层过滤, 我们需要递归
      const routes = this.filterRoutes(this.asyncRoutes)
      return routes
    }
  },
  methods: {
    filterRoutes (routes) {
      const res = []
      routes.forEach((route) => {
        // undefind ! true
        if (!route.hide) {
          res.push(route)
          // 判断 children
          // if(route?.)
        }
      })
    }
  }
}
</script>

<style></style>
