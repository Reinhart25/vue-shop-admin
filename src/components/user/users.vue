<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="input-search">
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="query">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2" class="btn-success">
        <el-button type="success">添加按钮</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      highlight-current-row="true"
    >
      <el-table-column type="index" label="#" width="80"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
      <el-table-column prop="name" label="邮箱"> </el-table-column>
      <el-table-column prop="name" label="电话"> </el-table-column>
      <el-table-column prop="name" label="创建时间"> </el-table-column>
      <el-table-column prop="name" label="用户状态"> </el-table-column>
      <el-table-column prop="name" label="操作"> </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // query查询参数可以为空 pagenum当前页码不能为空 pagesize每页显示条数不能为空
    // 获取用户列表的请求
    async getUserList () {
      // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common.Authorization = AUTH_TOKEN
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      console.log(res)
    }
  }
}
</script>

<style>
.input-search {
  margin-top: 15px;
  margin-bottom: 15px;
  /* width: 100px; */
}
.btn-success {
  margin-left: 5px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  height: 100%;
}
</style>
