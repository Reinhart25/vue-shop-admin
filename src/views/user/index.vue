<template>
  <el-card class="box-card">
    <!-- 1. 面包屑 -->
    <my-bread level1="用户管理" level2="用户列表"></my-bread>
    <!-- 2. 搜索框 -->
    <el-row class="input-search">
      <el-col :span="12">
        <el-input placeholder="请输入内容" v-model="query" clearable @clear="loadUserList">
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2" class="btn-success">
        <el-button type="success" @click="showAddUserDia">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3. 表格 -->
    <el-table :data="userlist" stripe style="width: 100%" highlight-current-row>
      <el-table-column type="index" label="#" width="80"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <!-- :formatter="formatter" -->
        <template slot-scope="scope">
          {{ scope.row.create_time | formmatdate }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeMgState(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="small" plain @click="showeEditUserDia(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-check" circle size="small" plain @click="showSetUserRoleDia(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" plain @click="showDeleteMsgBox(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4. 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 弹出对话框 -->
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

    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          {{ currentUsername }}
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          {{ currentRoleId }}
          <!-- 如果select 的绑定的数据的值 和 option 的value一样，就会显示该option 的label值 -->
          <el-select v-model="currentRoleId" placeholder="请选择角色">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="item.roleName" :value="item.id" v-for="(item, i) in roles" :key="i"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      // 分配角色 初始值
      currentRoleId: -1,
      currentUsername: '',
      currentUserId: -1,
      // 保存所有的角色数据
      roles: [],
      // 添加用户的对话框 输入框的宽度
      formLabelWidth: '100px',
      // 控制添加 编辑 用户的对话框的属性 默认一开始是不打开
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
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
    // 分配角色- 发送请求
    async setRole () {
      // users/:id/role
      // id: 要修改的用户的id
      // 请求体中 rid修改的新值角色id
      const res = await this.$http.put(`users/${this.currentUserId}/role`, {
        rid: this.currentRoleId
      })
      console.log(res)
      // 关闭对话框
      this.dialogFormVisibleRole = false
    },
    // 分配角色-打开对话框
    async showSetUserRoleDia (user) {
      this.currentUserId = user.id
      this.currentUsername = user.username
      // 2. 获取所有的角色名字
      const res1 = await this.$http.get('roles')
      // console.log(res1)
      this.roles = res1.data.data
      // 1.  获取当前用户的角色id
      const res = await this.$http.get(`users/${user.id}`)
      // console.log(res)
      // 接口文档的key名 是role_id 其实是rid
      this.currentRoleId = res.data.data.rid
      this.dialogFormVisibleRole = true
    },
    // 开关:修改用户状态 scope.row代表当前用户 v-model视图改变数据改变
    async changeMgState (user) {
      // 发送请求 users/:uId/state/:type
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      )
      console.log(res)
    },
    // 编辑用户-发送请求
    async editUser () {
      // users/:id
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      console.log(res)
      // 1. 关闭对话框
      this.dialogFormVisibleEdit = false
      // 2. 更新视图
      this.getUserList()
    },
    // 编辑用户-显示对话框
    showeEditUserDia (user) {
      // 2.获取用户数据
      // console.log(user)
      this.form = user
      this.dialogFormVisibleEdit = true
    },
    // 删除用户-打开消息盒子
    showDeleteMsgBox (userId) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 注意： async 写在await 最近的参数
        .then(async () => {
          // 发送删除的请求:id ---> 用户id
          // 1. data 中找userId
          // 2. 把userId 以 showDeleteMsgBox 参数形式传进来
          const res = await this.$http.delete(`users/${userId}`)
          // console.log(res)
          if (res.data.meta.status === 200) {
            // 1. 提示成功
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 2. 更新视图
            this.getUserList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
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
        // 1. 提示成功 注意：这里是201
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
      // 清空form
      this.form = {}
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
      // 改变之后重新更新视图自动回到1
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
      // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌设置在统一请求拦截器
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      // console.log(res)
      // console.log('更新用户')
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
