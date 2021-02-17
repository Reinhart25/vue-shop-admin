<template>
  <el-card class="box-card">
    <!-- 1. 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2. 搜索框 -->
    <el-row class="input-search">
      <el-col :span="12">
        <el-input
          placeholder="请输入内容"
          v-model="query"
          clearable
          @clear="loadUserList"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchUser"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="2" class="btn-success">
        <el-button type="success" @click="showAddUserDia">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3. 表格 -->
    <el-table :data="userlist" stripe style="width: 100%" highlight-current-row>
      <el-table-column type="index" label="#" width="80"> </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="100"
      ></el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column label="创建时间">
        <!-- :formatter="formatter" -->
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtdate }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <!-- slot-scope="scope" -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
            plain
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="small"
            plain
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4. 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 对话框 -->
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      // 添加用户的对话框 输入框的宽度
      formLabelWidth: '100px',
      // 控制添加用户的对话框
      dialogFormVisibleAdd: false,
      // 添加用户的form数据
      // username用户名称不能为空 password用户密码不能为空 email邮箱可以为空 mobile手机号可以为空
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 分页相关数据
      query: '',
      total: -1,
      pagenum: 1,
      pagesize: 2,
      // 表格绑定的数据
      // create_time: (...)
      // email: "adsfad@qq.com"
      // id: 500
      // mg_state: true
      // mobile: "12345678"
      // role_name: "超级管理员"
      // username: "admin"
      userlist: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 添加用户-发送请求
    async addUser () {
      // 2. 关闭对话框
      this.dialogFormVisibleAdd = false
      const res = await this.$http.post('users', this.form)
      const {
        data,
        meta: { msg, status }
      } = res.data
      console.log(data)
      if (status === 201) {
        // 1. 提示成功
        this.$message.success(msg)
        // 3. 更新视图
        this.getUserList()
        // 4. 清空文本框
        this.form = {}
        // for (const key in this.form) {
        //   if (this.form.hasOwnProperty(key)) {
        //     this.form[key] = ''
        //   }
        // }
      } else {
        this.$message.warning(msg)
      }
    },
    // 添加用户-显示对话框
    showAddUserDia () {
      this.dialogFormVisibleAdd = true
    },
    // 清空搜索框 重新获取数据
    loadUserList () {
      this.getUserList()
    },
    // 搜索用户
    searchUser () {
      // 按照input 绑定的query参数 发请求
      this.getUserList()
    },
    // 分页相关方法
    // 24条
    // pagenum=3
    // pagesize=2
    // 1,2/3,4/5,6
    // 数据 ->
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      // this.pagenum = 1
      this.getUserList()
    },
    // 分类相关-> 处理当前页
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    // query查询参数可以为空 pagenum当前页码不能为空 pagesize每页显示条数不能为空
    // 获取用户列表的请求
    async getUserList () {
      // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common.Authorization = AUTH_TOKEN

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      // console.log(res)
      const {
        meta: { status, msg },
        data: { users, total }
      } = res.data
      if (status === 200) {
        // 1. 给表格数据赋值
        this.userlist = users
        // 2. 给total 赋值
        this.total = total
        // 3. 提示
        // this.$message.success(msg)
      } else {
        // 提示
        this.$message.warning(msg)
      }
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
